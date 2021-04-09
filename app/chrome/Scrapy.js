const Xvfb = require('xvfb')
const puppeteer = require('puppeteer')
const Helpers = require('../helpers/index')
const globalConfig = require('../config/config.local')
const ObjectID = require('mongodb').ObjectID

class Scrapy {
    constructor(config, coupons, job, done) {
        this.backgroundPage = null
        this.lastMessage = null

        this.config = config
        this.coupons = coupons
        this.job = job
        this.done = done

        this.fullCouponsLength = coupons.length
    }

    async watchJobStatus() {
        return new Promise(resolve => {
            const agenda = require('../jobs/agenda')

            const checkJob = async () => {
                const [job] = await agenda.jobs({
                    _id: ObjectID(this.job.attrs._id),
                })
                if (
                    !job ||
                    job.attrs.disabled ||
                    !job.attrs.lockedAt ||
                    !this.browser
                ) {
                    console.log(
                        '> Error: Job Not Found or Job Is Finished/Disabled'
                    )
                    this.browser && (await this.browser.close())
                    await this.done()
                    resolve(true)
                } else {
                    setTimeout(checkJob, 2000)
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
            ],
        })

        this.backgroundPage = await this.browser
            .targets()
            .find(target => target.type() === 'background_page')
            .page()
    }

    // extension load store
    async extensionLoaded() {
        await this.backgroundPage.waitForFunction(
            async () =>
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
                }),
            {
                timeout: globalConfig.timeout,
            }
        )
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

                if (data.storeId === this.config.storeId) {
                    if (data.type === 'errorDone') {
                        console.log('Error: exit 1')
                        this.browser && (await this.browser.close())
                        await this.done()
                        return
                    } else if (data.type === 'applyDone') {
                        this.browser && (await this.browser.close())

                        const {
                            coupons,
                            validCoupons,
                            invalidCoupons,
                        } = this.job.attrs.data

                        if (
                            coupons.length ===
                            validCoupons.length + invalidCoupons.length
                        ) {
                            await this.done()
                        }
                    } else if (data.type === 'applyFailed') {
                        if (data.code) {
                            const currentCoupon = data.code
                            const { invalidCoupons } = this.job.attrs.data
                            invalidCoupons.push(currentCoupon)
                            await this.job.save()
                        }
                    } else if (data.type === 'applySuccess') {
                        const currentCoupon = data.code
                        const { validCoupons } = this.job.attrs.data
                        validCoupons.push(currentCoupon)
                        await this.job.save()
                    }
                }
            }
        })
    }

    // open product page and add to cart
    async handleAddProduct() {
        const page = await this.browser.newPage()

        // 拒绝请求多媒体资源，节省网络消耗
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

        // 打开产品页面
        await page.goto(this.config.product, {
            waitUntil: 'load',
            timeout: globalConfig.timeout,
        })
        await page.waitForSelector(
            this.config.button,
            {
                visible: true,
            },
            {
                timeout: globalConfig.timeout,
            }
        )
        await Helpers.wait(0.5)

        // 添加到购物车
        await page.waitForSelector(this.config.button, {
            timeout: globalConfig.timeout,
        })
        await page.evaluate(selector => {
            const btn = document.querySelector(selector)
            if (btn) {
                btn.click()
            }
        }, this.config.button)
    }

    async handleApplyCoupon() {
        // 等待加载完店铺信息，防止反复更改折扣码
        await this.backgroundPage.waitForFunction(
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
        )

        // 关闭其他页面（除了tab），打开新的页面
        await Promise.all(
            this.browser
                .targets()
                .filter(target => target.type() === 'page')
                .slice(1)
                .map(target => target.page().then(page => page.close()))
        )

        // 拒绝请求多媒体资源，节省网络消耗
        const page = await this.browser.newPage()
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

        // 打开购物车
        await page.goto(this.config.cart, {
            waitUntil: 'domcontentloaded',
            timeout: globalConfig.timeout,
        })
        await page.waitForSelector('#fatcoupon-root', {
            visible: true,
            timeout: globalConfig.timeout,
        })
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
        try {
            // 创建基于xvfb的浏览器，等待插件加载完成
            await this.createBrowser()
            await this.extensionLoaded()

            // 监听redux store变化，通过console，对code进行处理
            await this.watchBackground()
            await this.watchApplyCoupon()

            // 添加产品到购物车，开始扫描
            await this.handleAddProduct()
            await this.handleApplyCoupon()

            this.watchJobStatus()
        } catch (e) {
            console.log(`> Puppeteer Error: ${e.message}`)

            this.browser && (await this.browser.close())
            const store = new Scrapy(
                this.config,
                this.coupons,
                this.job,
                this.done
            )
            await store.start()
        }
    }
}

module.exports = Scrapy
