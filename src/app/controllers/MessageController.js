const redis = require('../db/redis')

module.exports = class {
  static async GET(ctx) {
    const message = JSON.parse(
      await redis.rpop('fatcoupon:message:' + ctx.request.formatIP)
    )

    ctx.body = message || {}
  }
  static async PUT(ctx) {
    const { type, message, description } = ctx.request.body

    await redis.lpush(
      'fatcoupon:message:' + ctx.request.formatIP,
      JSON.stringify({
        type,
        message,
        description,
      })
    )

    ctx.body = {
      status: 'success',
    }
  }
}
