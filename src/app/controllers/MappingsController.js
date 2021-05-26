const redis = require('../db/redis')
const Mappings = require('../helpers/Mappings')

class MappingsController {
  static async GET(ctx) {
    const mappings = await Mappings.loadMappings()

    ctx.body = {
      status: 'success',
      mappings,
    }
  }
  static async PUT(ctx) {
    const { mappings, key } = ctx.request.body

    if (key === 'FatCouponDeng') {
      await redis.set('fatcoupon:mappings', mappings)
      ctx.body = {
        status: 'success',
      }

      return
    }

    ctx.body = {
      status: 'error',
      reason: 'NOT FOUND THIS KEY',
    }
  }
}

module.exports = MappingsController
