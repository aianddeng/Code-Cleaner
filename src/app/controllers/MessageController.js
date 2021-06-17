const redis = require('../db/redis')

module.exports = class {
  static async GET(ctx) {
    const message = JSON.parse(
      await redis.rpop('fatcoupon:message:' + ctx.request.formatIP)
    )

    ctx.body = message || {}
  }
  static async PUT(ctx) {
    await redis.lpush(
      'fatcoupon:message:' + ctx.request.formatIP,
      JSON.stringify(ctx.request.body)
    )

    ctx.body = {
      status: 'success',
    }
  }
}
