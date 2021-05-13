const redis = require('../db/redis')

const getIP = (req) => {
  const ip =
    req.headers['x-forwarded-for'] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  return ip ? ip.replace('::ffff:', '') : ''
}

module.exports = class {
  static async GET(ctx) {
    const ip = getIP(ctx.request)

    const message = JSON.parse(await redis.rpop('fatcoupon:message:' + ip))

    ctx.body = message || {}
  }
  static async PUT(ctx) {
    const ip = getIP(ctx.request)

    const { type, message, description } = ctx.request.body

    await redis.lpush(
      'fatcoupon:message:' + ip,
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
