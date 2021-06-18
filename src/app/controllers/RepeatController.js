const moment = require('moment')
const redis = require('../db/redis')
const repeatQueue = require('../jobs/repeatQueue')

module.exports = class {
  static async GET(ctx) {
    const query = {
      page: 1,
      size: 10,
      ...ctx.request.query,
    }

    const start = (query.page - 1) * query.size
    const end = query.page * query.size

    const storeData = JSON.parse(await redis.get('fatcoupon:store'))

    const allRepeatable = await repeatQueue.getRepeatableJobs()

    const total = allRepeatable.length
    const datas = allRepeatable
      .sort((a, b) => a.next - b.next)
      .slice(start, end)
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
    const nextPage = end < allRepeatable.length

    ctx.body = {
      total,
      datas,
      nextPage,
    }
  }

  static async PUT(ctx) {
    const {
      storeId,
      storeIds = storeId.split(','),
      repeatRule,
      repeatTime,
    } = ctx.request.body

    await Promise.all(
      storeIds.map(async (storeId) => {
        const allRepeatable = await repeatQueue.getRepeatableJobs()
        const hasRepeatable = allRepeatable.find((el) => el.name === storeId)
        if (hasRepeatable) {
          await repeatQueue.removeRepeatableByKey(hasRepeatable.key)
        }

        const currentDate = moment(Date.now())
        const repeat = {
          cron: null,
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

        repeatQueue.add(storeId, ctx.request.body, {
          repeat,
        })

        return {
          name: storeId,
          data: ctx.request.body,
          opts: {
            repeat,
          },
        }
      })
    )

    ctx.body = {
      status: 'success',
    }
  }

  static async POST(ctx) {
    const { key } = ctx.request.body

    await repeatQueue.removeRepeatableByKey(key)

    ctx.body = {
      status: 'success',
    }
  }
}
