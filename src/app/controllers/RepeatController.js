const axios = require('axios')
const moment = require('moment')
const redis = require('../db/redis')
const repeatQueue = require('../jobs/repeatQueue')

class RepeatController {
  static async GET(ctx) {
    const storeData = JSON.parse(await redis.get('fatcoupon:store'))

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

    await RepeatController.GET(ctx)
  }
}

module.exports = RepeatController
