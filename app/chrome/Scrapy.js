const Helpers = require('../helpers')

class Scrapy {
    // 初始化
    constructor(browser, config, coupons) {
        this.config = config
        this.browser = browser
        this.coupons = coupons
        this.backgroundPage = null
    }

    // 监听redux，当找到可用折扣码或扫描完折扣码时，触发console事件
    async watchBackground() {
        // 获取插件背景页
        const backgroundPage = await this.browser
            .targets()
            .find(target => target.type() === 'background_page')
            .page()

        // 背景页执行以下程序
        await backgroundPage.evaluate(() => {
            const subscribeFunction = async () => {
                // 获取当前标签页Id
                const currentTabId = await new Promise(resolve => {
                    chrome.tabs.query({ active: true }, tabs => {
                        tabs && tabs.length && resolve(tabs[0].id)
                    })
                })
                // 当前标签页state
                const currentTabData = store.getState().tabs[currentTabId]
                if (currentTabData) {
                    // 输出当前及成功应用的索引
                    if ([4, 5].includes(currentTabData.phase)) {
                        if (currentTabData.applyPopup.curCouponIndex > -1) {
                            console.log(
                                JSON.stringify({
                                    type:
                                        currentTabData.phase === 4
                                            ? 'applying'
                                            : 'applySuccess',
                                    index:
                                        currentTabData.applyPopup
                                            .curCouponIndex,
                                })
                            )
                        }
                    } else if (currentTabData.phase === 6) {
                        // 折扣码全部扫描完成，结束程序
                        if (
                            currentTabData.couponsAmount ===
                            currentTabData.applyPopup.curCouponIndex
                        ) {
                            console.log(
                                JSON.stringify({
                                    type: 'applyDone',
                                })
                            )
                        }
                    }
                }
            }
            // 订阅redux store
            const store = window.controller.reduxStore
            store.subscribe(subscribeFunction)
        })

        this.backgroundPage = backgroundPage
    }

    async watchApplyCoupon() {
        // 监听redux事件，更新Coupon状态
        await this.backgroundPage.on('console', async msg => {
            let data = {}

            try {
                data = JSON.parse(msg.text())
            } catch {}

            if (data.type === 'applying') {
                data.index &&
                    console.log('invalid: ', this.coupons[data.index - 1].code)
                console.log('working: ', this.coupons[data.index].code)
            } else if (data.type === 'applySuccess') {
                console.log('valid: ', this.coupons[data.index].code)
                this.coupons.splice(0, data.index + 1)
                if (this.coupons.length) await this.handleApplyCoupon()
            } else if (data.type === 'applyDone' || !this.coupons.length) {
                console.log('Process Finish.')
                await this.browser.close()
            }
        })
    }

    // 打开产品页面，并添加产品
    async addProduct() {
        const page = await this.browser.newPage()

        // 拒绝请求多媒体资源，节省网络消耗
        await page.setRequestInterception(true)
        await page.on('request', req => {
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
            timeout: 0,
        })
        await page.waitForSelector(this.config.button, {
            visible: true,
        })
        await Helpers.wait(2000)

        // 添加到购物车
        await page.waitForSelector(this.config.button)
        await page.evaluate(selector => {
            const btn = document.querySelector(selector)
            if (btn) {
                btn.click()
            }
        }, this.config.button)
        await Helpers.wait(2000)
    }

    async handleApplyCoupon() {
        // 替换掉店铺的折扣码
        await this.backgroundPage.evaluate(
            async config => {
                window.controller.couponAppliers
                    .filter(el => el && el.store.id === config.storeId)
                    .forEach(el => (el.store.coupons = config.coupons))
            },
            { coupons: this.coupons, storeId: this.config.storeId }
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
        await page.on('request', req => {
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
            waitUntil: 'load',
            timeout: 0,
        })
        await page.waitForSelector('#fatcoupon-root', {
            visible: true,
        })
        await page.waitForFunction(
            () =>
                document
                    .querySelector('#fatcoupon-root')
                    .shadowRoot.querySelector('.apply-coupon button'),
            {
                timeout: 0,
            }
        )

        // 开始扫描折扣码
        await page.evaluate(() => {
            const startBtn = document
                .querySelector('#fatcoupon-root')
                .shadowRoot.querySelector('.apply-coupon button')
            startBtn.click()
        })
    }

    async start() {
        console.log('Process Start.')

        // 监听redux store变化，并推送到console -> 监听console，对code进行处理
        await this.watchBackground()
        await this.watchApplyCoupon()

        // 添加产品到购物车，开始扫描
        await this.addProduct()
        await this.handleApplyCoupon()
    }
}

module.exports = Scrapy
