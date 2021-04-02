const puppeteer = require('puppeteer')
const globalConfig = require('../config/config.local')
const Coupon = require('../helpers/apis/Coupon')
const Scrapy = require('./Scrapy')

const TasksModel = require('../models/Tasks')
const CouponModel = require('../models/Coupon')

const disconnect = require('../dbHelpers')

const main = async () => {
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

    while (true) {
        // 程序开始，重置状态
        await TasksModel.updateMany(
            {
                status: 'doing',
            },
            {
                status: 'waiting',
            }
        )

        const tasks = await TasksModel.find({ status: 'waiting' }).limit(1)
        for (const task of tasks) {
            // ?应该从数据库取而不是接口
            const coupons = await Coupon.find(task.storeId)
            const storeConfig = (
                await import('./mappings/' + task.storeId + '.js')
            ).default
            const store = new Scrapy(browser, storeConfig, coupons)

            await TasksModel.findByIdAndUpdate(task._id, {
                status: 'doing',
            })
            // ?提前结束
            await store.start()
            await TasksModel.findByIdAndUpdate(task._id, {
                status: 'finished',
            })
        }

        if (tasks.length)
            await new Promise(resolve => setTimeout(resolve, 3000))
        else await new Promise(resolve => setTimeout(resolve, 30000))
    }
}

main()
