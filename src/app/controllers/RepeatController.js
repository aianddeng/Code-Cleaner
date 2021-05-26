const axios = require('axios')
const moment = require('moment')
const redis = require('../db/redis')
const repeatQueue = require('../jobs/repeatQueue')

class RepeatController {
  static async GET(ctx) {
    let storeData = JSON.parse((await redis.get('fatcoupon:store')) || '{}')

    if (!storeData || !Object.keys(storeData).length) {
      const { data } = await axios.get(
        'https://apis.fatcoupon.com/api/extension/stores'
      )

      storeData = data.data.data

      await redis.set('fatcoupon:store', JSON.stringify(storeData))
      await redis.expire('fatcoupon:store', 6 * 60 * 60)
    }

    const allRepeatable = await repeatQueue.getRepeatableJobs()

    const afterAllRepeatable = allRepeatable
      .map((el) => ({
        storeName: storeData.find((store) => store.id === el.name).name,
        storeId: el.name,
        rule: el.cron.endsWith('* * * ?')
          ? 'Each Hour'
          : el.cron.endsWith('* * ?')
          ? 'Each Day'
          : el.cron.includes('* *')
          ? 'Each Week'
          : 'Unset',
        next: el.next,
        key: el.key,
      }))
      .reverse()

    ctx.body = {
      total: afterAllRepeatable.length,
      datas: afterAllRepeatable,
    }
  }

  static async PUT(ctx) {
    const { storeId, repeatRule, repeatTime } = ctx.request.body

    // 同一个店铺只允许添加一个循环任务
    const allRepeatable = await repeatQueue.getRepeatableJobs()
    const hasRepeatable = allRepeatable.find((el) => el.name === storeId)
    if (hasRepeatable) {
      await repeatQueue.removeRepeatableByKey(hasRepeatable.key)
    }

    const currentDate = moment(Date.now())
    const repeat = {
      cron: null,
      every: null,
    }
    switch (repeatRule) {
      case 'hour':
        repeat.cron =
          repeatTime === 'current'
            ? `${currentDate.second()} ${currentDate.minute()} * * * ?`
            : '0 0 * * * ?'
        break
      case 'day':
        repeat.cron =
          repeatTime === 'current'
            ? `${currentDate.second()} ${currentDate.minute()} ${currentDate.hour()} * * ?`
            : '0 0 0 * * ?'
        break
      case 'week':
        repeat.cron =
          repeatTime === 'current'
            ? `${currentDate.second()} ${currentDate.minute()} ${currentDate.hour()} * * ${currentDate.weekday()}`
            : '0 0 0 * * MON'
        break
      default:
        repeat.cron = repeatTime === 'current' ? '' : '0 * * * * ?'
        break
    }

    await repeatQueue.add(storeId, ctx.request.body, {
      repeat,
    })

    await RepeatController.GET(ctx)
  }

  static async DELETE(ctx) {
    const { key } = ctx.request.body

    await repeatQueue.removeRepeatableByKey(key)

    await RepeatController.GET(ctx)
  }
}

module.exports = RepeatController
