const axios = require('axios')
const redis = require('../db/redis')
const Mappings = require('../helpers/Mappings')

module.exports = class {
  static async GET(ctx) {
    const mappings = await Mappings.loadMappings()
    const mappingsId = mappings.map((el) => el.storeId)

    let storeData = JSON.parse(await redis.get('fatcoupon:store'))

    if (!storeData) {
      const { data } = await axios.get(
        'https://apis.fatcoupon.com/api/extension/stores'
      )

      storeData = data.data.data

      await redis.set('fatcoupon:store', JSON.stringify(storeData))
      await redis.expire('fatcoupon:store', 6 * 60 * 60)
    }

    ctx.body = storeData
      .sort((a, b) => b.priority - a.priority)
      .map((el) => ({
        id: el.id,
        name: el.name,
        domain: el.domain,
        mapping: mappingsId.includes(el.id),
      }))
  }

  static async GET_ID(ctx) {
    const { data } = await axios.get(
      'https://apis.fatcoupon.com/stores/' + ctx.params.id
    )

    ctx.body = data.data.data
  }
}
