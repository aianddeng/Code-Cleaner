const multiQueue = require('../jobs/multiQueue')

module.exports = class {
  static async GET(ctx) {
    const datas = await multiQueue.getRepeatableJobs()
    const total = datas.length

    ctx.body = {
      total,
      datas,
    }
  }
  static async PUT(ctx) {
    const { storeId, storeName } = ctx.request.body

    await multiQueue.add(
      storeId,
      {
        storeId,
        storeName,
      },
      {
        repeat: {
          every: 1 * 60 * 1000,
          limit: 5,
        },
      }
    )

    ctx.body = {
      status: 'success',
    }
  }
  static async DELETE(ctx) {
    const { key } = ctx.request.body
    await multiQueue.removeRepeatableByKey(key)

    ctx.body = {
      status: 'success',
    }
  }
}
