const Xvfb = require('xvfb')
const puppeteer = require('puppeteer')
const Helpers = require('../helpers/index')
const globalConfig = require('../config/config.local')
const ObjectID = require('mongodb').ObjectID

class Scrapy {
    constructor(config, coupons, job, done) {
        this.backgroundPage = null
        this.lastMessage = null
        this.browser = null

        this.config = config
        this.coupons = coupons
        this.job = job
        this.done = done
    }

    async watchJobStatus() {
        return new Promise(resolve => {
            const agenda = require('../jobs/agenda')

            const checkJob = async () => {
                const [job] = await agenda.jobs({
                    _id: ObjectID(this.job.attrs._id),
                })
                if (!job || job.attrs.disabled) {
                    try {
                        this.browser && (await this.browser.close())
                        await this.done()
                    } catch (e) {
                        console.log(e.message)
                    } finally {
                        console.log(
                            `> Job (${this.job.attrs._id}) Not Found or Is Disabled`
                        )
                        resolve(true)
                    }
                } else {
                    setTimeout(checkJob, 5000)
                }
            }

            setTimeout(checkJob, 0)
        })
    }

    // xvfb + chrome
    async createBrowser() {
        const xvfb = new Xvfb({
            reuse: true,
            silent: true,
        })
        xvfb.start(err => err && console.log('Xvfb Error: ', err))

        this.browser = await puppeteer.launch({
            headless: globalConfig.headless,
            defaultViewport: null,
            args: [
                '--disable-extensions-except=' + globalConfig.extensionPath,
                '--load-extension=' + globalConfig.extensionPath,
                '--display=' + xvfb._display,
                '--no-sandbox',
                '--hide-scrollbars',
                '--disable-blink-features=AutomationControlled',
            ],
        })

        this.backgroundPage = await this.browser
            .targets()
            .find(target => target.type() === 'background_page')
            .page()
    }

    async createNewpage(url = '', selector = '') {
        const page = await this.browser.newPage()
        await page.setUserAgent(
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.68'
        )
        await page.evaluate(() => {
            Object.defineProperties(navigator, {
                webdriver: {
                    get: () => false,
                },
            })
        })
        await page.evaluateOnNewDocument(() => {
            const newProto = navigator.__proto__
            delete newProto.webdriver
            navigator.__proto__ = newProto
            window.chrome = {}
            window.chrome.app = {
                InstallState: 'hehe',
                RunningState: 'haha',
                getDetails: 'xixi',
                getIsInstalled: 'ohno',
            }
            window.chrome.csi = function () {}
            window.chrome.loadTimes = function () {}
            window.chrome.runtime = function () {}
            Object.defineProperty(navigator, 'userAgent', {
                get: () =>
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
            })
            Object.defineProperty(navigator, 'plugins', {
                get: () => [
                    {
                        description: 'Portable Document Format',
                        filename: 'internal-pdf-viewer',
                        length: 1,
                        name: 'Chrome PDF Plugin',
                    },
                ],
            })
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en'],
            })
            const originalQuery = window.navigator.permissions.query
            window.navigator.permissions.query = parameters =>
                parameters.name === 'notifications'
                    ? Promise.resolve({ state: Notification.permission })
                    : originalQuery(parameters)
        })
        await page.setRequestInterception(true)
        page.on('request', req => {
            if (
                ['image', 'media', 'font', 'stylesheet'].includes(
                    req.resourceType()
                )
            ) {
                req.respond({
                    status: 200,
                    body: '',
                })
            } else {
                req.continue()
            }
        })

        if (this.config.cookie) {
            await this.handleSetCookie(page)
        }

        if (url) {
            await Promise.race([
                page.goto(url, {
                    waitUntil: 'load',
                    timeout: globalConfig.timeout,
                }),
                Helpers.wait((globalConfig.timeout - 1000) / 1000),
            ])
            if (selector) {
                await page.waitForSelector(selector, {
                    visible: true,
                    timeout: globalConfig.timeout,
                })

                await page.$eval(selector, el => el.removeAttribute('disabled'))
            }
        }
        await Helpers.wait(1)

        return page
    }

    async handleSetCookie(page) {
        const cookie = []
        this.config.cookie.split(';').map(value => {
            const key = value.split('=')
            const item = {}
            item['domain'] = '.columbia.com'
            item['name'] = key[0].replace(/\s/g, '')
            item['value'] = key[1].replace(/\s/g, '')
            item['path'] = '/'
            cookie.push(item)
        })
        cookie.map(async value => {
            console.log('setCookie: ', value)
            await page.setCookie(value)
        })
    }

    async handleLogin() {
        const page = await this.createNewpage(
            this.config.cart,
            this.config.login.selector.username
        )

        await page.type(
            this.config.login.selector.username,
            this.config.login.username
        )
        await page.type(
            this.config.login.selector.password,
            this.config.login.password
        )
        await page.click(this.config.login.selector.button)

        await Helpers.wait(1)
    }

    // extension load store
    async extensionLoaded() {
        await Promise.race([
            this.backgroundPage.waitForFunction(
                async useLocalScript => {
                    await new Promise(resolve => {
                        const checkExtensionLoaded = () => {
                            window &&
                            window.controller &&
                            window.controller.reduxStore &&
                            window.controller.supportedStores
                                ? resolve(true)
                                : setTimeout(checkExtensionLoaded, 500)
                        }
                        setTimeout(checkExtensionLoaded, 500)
                    })
                    if (useLocalScript) window.Fatcoupon.env.script = 'local'
                    return true
                },
                {
                    timeout: globalConfig.timeout,
                },
                !!this.config.useLocalScript
            ),
            Helpers.wait(10),
        ])
    }

    // redux subscribe
    async watchBackground() {
        await this.backgroundPage.evaluate(() => {
            const store = window.controller.reduxStore
            store.subscribe(async () => {
                // 获取当前标签页Id
                const currentTabId = await new Promise(resolve => {
                    chrome.tabs.query({ active: true }, tabs => {
                        tabs && tabs.length && resolve(tabs[0].id)
                    })
                })

                // 当前标签页state
                const currentTabData = store.getState().tabs[currentTabId]
                if (currentTabData) {
                    if (currentTabData.phase === 4) {
                        const codeMatch = currentTabData.applyPopup.code.match(
                            /fatcoupon:(\w+?):(.+)/
                        )
                        if (
                            codeMatch &&
                            currentTabData.applyPopup.curCouponIndex > -1
                        ) {
                            console.log(
                                JSON.stringify({
                                    master: 'fatcoupon:clear-coupon',
                                    storeId: currentTabData.storeId,
                                    type:
                                        codeMatch[1] === 'valid'
                                            ? 'applySuccess'
                                            : 'applyFailed',
                                    code: codeMatch[2],
                                })
                            )
                        }
                    } else if (currentTabData.phase === 5) {
                        console.log(
                            JSON.stringify({
                                master: 'fatcoupon:clear-coupon',
                                storeId: currentTabData.storeId,
                                type: 'applyDone',
                            })
                        )
                    } else if (currentTabData.phase === 6) {
                        console.log(
                            JSON.stringify({
                                master: 'fatcoupon:clear-coupon',
                                storeId: currentTabData.storeId,
                                type: 'errorDone',
                            })
                        )
                    }
                }
            })
        })
    }

    // console event
    async watchApplyCoupon() {
        this.backgroundPage.on('console', async msg => {
            const msgText = msg.text()
            if (
                msgText.includes('fatcoupon:clear-coupon') &&
                this.lastMessage !== msgText
            ) {
                this.lastMessage = msgText
                const data = JSON.parse(msgText)

                const currentCoupon = data.code
                const { coupons } = this.job.attrs.data

                if (data.storeId === this.config.storeId) {
                    if (data.type === 'applyDone') {
                        this.browser && (await this.browser.close())
                        await this.done()
                    } else if (data.type === 'errorDone') {
                        this.browser && (await this.browser.close())
                        this.job.fail('Error Done')
                        await this.job.save()
                        await this.done()
                    } else {
                        if (data.type === 'applyFailed') {
                            coupons
                                .filter(
                                    el =>
                                        el.code.toUpperCase() ===
                                        currentCoupon.toUpperCase()
                                )
                                .map(el => (el.validStatus = -1))
                        } else if (data.type === 'applySuccess') {
                            coupons
                                .filter(
                                    el =>
                                        el.code.toUpperCase() ===
                                        currentCoupon.toUpperCase()
                                )
                                .map(el => (el.validStatus = 1))
                        }

                        await this.job.save()
                    }
                }
            }
        })
    }

    async handleAddProduct() {
        const page = await this.createNewpage(
            this.config.product,
            this.config.button
        )

        await page.evaluate(selector => {
            const btn = document.querySelector(selector)
            if (btn) {
                btn.click()
            }
        }, this.config.button)

        if (!this.config.cart.startsWith('http')) {
            this.config.cart = await page.$eval(this.config.cart, el =>
                el.getAttribute('href')
            )

            if (!this.config.cart.startsWith('http')) {
                const url = new URL(this.config.product)

                if (this.config.cart.startsWith('//')) {
                    this.config.cart = url.protocol + this.config.cart
                } else if (this.config.cart.startsWith('/')) {
                    this.config.cart = url.origin + this.config.cart
                } else {
                    this.config.cart = url.origin + '/' + this.config.cart
                }
            }
        }

        await Helpers.wait(1)
    }

    async handleApplyCoupon() {
        // 等待加载完店铺信息，防止反复更改折扣码
        await Promise.race([
            this.backgroundPage.waitForFunction(
                async config => {
                    return await new Promise(resolve => {
                        const store = window.controller.reduxStore
                        const checkStoreState = () => {
                            const ready = store
                                .getState()
                                .stores.find(el => el.id === config.storeId)

                            if (ready && ready.coupons) {
                                store
                                    .getState()
                                    .stores.find(
                                        el => el.id === config.storeId
                                    ).coupons = config.coupons

                                resolve(true)
                            } else {
                                setTimeout(checkStoreState, 500)
                            }
                        }
                        setTimeout(checkStoreState, 500)
                    })
                },
                {
                    timeout: globalConfig.timeout,
                },
                {
                    coupons: this.coupons,
                    storeId: this.config.storeId,
                }
            ),
            Helpers.wait(10),
        ])

        // 关闭其他页面（除了tab），打开新的页面
        await Promise.all(
            this.browser
                .targets()
                .filter(target => target.type() === 'page')
                .slice(1)
                .map(target => target.page().then(page => page.close()))
        )

        const page = await this.createNewpage(
            this.config.cart,
            '#fatcoupon-root'
        )

        await page.waitForFunction(
            () =>
                document
                    .querySelector('#fatcoupon-root')
                    .shadowRoot.querySelector('.apply-coupon button'),
            {
                timeout: globalConfig.timeout,
            }
        )

        await page.evaluate(() => {
            const button = document
                .querySelector('#fatcoupon-root')
                .shadowRoot.querySelector('.apply-coupon button')
            button && button.click()
        })
    }

    async start() {
        if (!this.coupons.length) {
            await this.done()
            console.log(`> Not Found Coupons: ${this.job.attrs._id}`)
            return true
        }

        try {
            await this.createBrowser()
            this.watchJobStatus()
            await this.extensionLoaded()

            await this.watchBackground()
            await this.watchApplyCoupon()

            if (this.config.login) {
                await this.handleLogin()
            }
            await this.handleAddProduct()
            await this.handleApplyCoupon()
        } catch (e) {
            console.log(`> Puppeteer Error: ${e.message}`)
            this.browser && (await this.browser.close())

            const agenda = require('../jobs/agenda')
            const [job] = await agenda.jobs({
                _id: ObjectID(this.job.attrs._id),
            })
            if (!job || job.attrs.disabled) {
            } else {
                this.job.fail('Error Puppeteer')
                await this.job.save()
            }
            await this.done()
        }
    }
}

module.exports = Scrapy
