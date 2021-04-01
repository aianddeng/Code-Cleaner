const puppeteer = require('puppeteer')
const globalConfig = require('../config/config.local')
const Coupon = require('../helpers/apis/Coupon')
const Scrapy = require('./Scrapy')

;(async (storeId = '5f0530dff7b6cd00110984a0') => {
    const browser = await puppeteer.launch({
        headless: globalConfig.headless,
        defaultViewport: {
            width: 0,
            height: 0,
        },
        args: [
            '--disable-extensions-except=' + globalConfig.extensionPath,
            '--load-extension=' + globalConfig.extensionPath,
        ],
    })

    const coupons = await Coupon.find(storeId)

    const storeConfig = (await import('./mappings/' + storeId + '.js')).default

    const store = new Scrapy(browser, storeConfig, coupons)

    await store.start()
})()
