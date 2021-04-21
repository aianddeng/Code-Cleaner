const fs = require('fs').promises
const path = require('path')
const axios = require('axios')
const redis = require('../db/redis')

module.exports = class {
  static async GET(ctx) {
    const storeData = await redis.get('fatcoupon:store')

    if (storeData) {
      ctx.body = JSON.parse(storeData)
    } else {
      const { data } = await axios.get(
        'https://apis.fatcoupon.com/api/extension/stores'
      )
      const mappings = (
        await fs.readdir(path.join(__dirname, '../chrome', 'mappings'))
      ).map((el) => el.replace(/\.js/, ''))

      const storeData = data.data.data
        .sort((a, b) => b.priority - a.priority)
        .map((el) => ({
          id: el.id,
          name: el.name,
          domain: el.domain,
          mapping: mappings.includes(el.id),
        }))

      ctx.body = storeData

      await redis.set('fatcoupon:store', JSON.stringify(storeData))
      await redis.expire('fatcoupon:store', 60 * 60)
    }
  }

  static async GET_ID(ctx) {
    const { data } = await axios.get(
      'https://apis.fatcoupon.com/stores/' + ctx.params.id
    )

    ctx.body = data.data.data
  }
}
