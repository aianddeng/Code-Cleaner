const fs = require('fs').promises
const path = require('path')
const axios = require('axios')
const redis = require('../db/redis')

const FatCoupon = require('../apis/FatCoupon')

module.exports = class {
  static async GET(ctx) {
    const mappingsId = (
      await fs.readdir(path.join(__dirname, '../chrome/mappings'))
    ).map((el) => el.replace(/\.js$/, ''))

    const storeData = JSON.parse(await redis.get('fatcoupon:store'))
      .sort((a, b) => b.priority - a.priority)
      .map((el) => ({
        id: el.id,
        name: el.name,
        domain: el.domain,
        mapping: mappingsId.includes(el.id),
      }))

    ctx.body = storeData
  }

  static async GET_ID(ctx) {
    const { id } = ctx.params

    const data = await FatCoupon.getStoreById(id)

    ctx.body = data
  }
}
