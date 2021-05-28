const fs = require('fs').promises
const path = require('path')
const axios = require('axios')
const redis = require('../db/redis')
const Product = require('../models/Product')

module.exports = class {
  static async GET(ctx) {
    let storeData = JSON.parse(await redis.get('fatcoupon:store'))

    if (!storeData) {
      const { data } = await axios.get(
        'https://apis.fatcoupon.com/api/extension/stores'
      )

      storeData = data.data.data

      await redis.set('fatcoupon:store', JSON.stringify(storeData))
      await redis.expire('fatcoupon:store', 6 * 60 * 60)
    }

    const mappingsId = (
      await fs.readdir(path.join(__dirname, '../chrome/mappings'))
    ).map((el) => el.replace(/\.js$/, ''))

    ctx.body = await Promise.all(
      storeData
        .sort((a, b) => b.priority - a.priority)
        .map((el) => ({
          id: el.id,
          name: el.name,
          domain: el.domain,
          mapping: mappingsId.includes(el.id),
        }))
        .map(async (el) => {
          if (el.mapping) {
            const storeId = el.id
            const storeConfig = require('../chrome/mappings/' + storeId)

            const [product] = await Product.find({ storeId })
              .sort({ _id: -1 })
              .limit(1)
            if (product && product.link) {
              storeConfig['product'] = product.link
            }

            return {
              ...el,
              product: storeConfig['product'],
            }
          }

          return el
        })
    )
  }

  static async GET_ID(ctx) {
    const { data } = await axios.get(
      'https://apis.fatcoupon.com/stores/' + ctx.params.id
    )

    ctx.body = data.data.data
  }
}
