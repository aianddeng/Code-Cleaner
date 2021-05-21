const repeatQueue = require('../jobs/repeatQueue')

module.exports = class {
  static async GET(ctx) {
    const allRepeatable = await repeatQueue.getRepeatableJobs()

    const afterAllRepeatable = allRepeatable.map((el) => ({
      storeId: el.name,
      rule: el.cron,
      next: el.next,
      key: el.key,
    }))

    ctx.body = {
      total: afterAllRepeatable.length,
      datas: afterAllRepeatable,
    }
  }

  static async PUT(ctx) {
    const { storeId, storeName } = ctx.request.body

    // 同一个店铺只允许添加一个循环任务
    const allRepeatable = await repeatQueue.getRepeatableJobs()
    const hasRepeatable = allRepeatable.find((el) => el.name === storeId)
    if (hasRepeatable) {
      await repeatQueue.removeRepeatableByKey(hasRepeatable.key)
    }

    await repeatQueue.add(
      storeId,
      {
        storeId,
        storeName,
      },
      {
        repeat: {
          cron: '1 * * * * ?',
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
