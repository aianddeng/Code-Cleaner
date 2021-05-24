const repeatQueue = require('../jobs/repeatQueue')
const redis = require('../db/redis')

module.exports = class {
  static async GET(ctx) {
    let storeData = JSON.parse(await redis.get('fatcoupon:store'))

    if (!storeData) {
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
        rule:
          el.cron === '0 0 * * * ?'
            ? 'Each Hour'
            : el.cron === '0 0 0 * * ?'
            ? 'Each Day'
            : el.cron === '0 0 0 * * MON'
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
    const { storeId, storeName, repeatRule } = ctx.request.body

    // 同一个店铺只允许添加一个循环任务
    const allRepeatable = await repeatQueue.getRepeatableJobs()
    const hasRepeatable = allRepeatable.find((el) => el.name === storeId)
    if (hasRepeatable) {
      await repeatQueue.removeRepeatableByKey(hasRepeatable.key)
    }

    let cron = null
    switch (repeatRule) {
      case 'hour':
        cron = '0 0 * * * ?'
        break
      case 'day':
        cron = '0 0 0 * * ?'
        break
      case 'week':
        cron = '0 0 0 * * MON'
        break
      default:
        cron = '0 * * * * ?'
        break
    }

    await repeatQueue.add(
      storeId,
      {
        storeId,
        storeName,
      },
      {
        repeat: {
          cron,
        },
      }
    )

    ctx.body = {
      status: 'success',
    }
  }

  static async DELETE(ctx) {
    const { key } = ctx.request.body

    await repeatQueue.removeRepeatableByKey(key)

    ctx.body = {
      status: 'success',
    }
  }
}
