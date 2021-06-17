const fs = require('fs').promises
const path = require('path')
const Product = require('../models/Product')

module.exports = class {
  static async GET(ctx) {
    const { storeId } = ctx.request.query

    if (storeId) {
      const [product] = await Product.find({ storeId })
        .sort({ _id: -1 })
        .limit(1)

      if (product && product.link) {
        ctx.body = {
          productLink: product.link,
        }
        return
      } else {
        const mappingsId = (
          await fs.readdir(path.join(__dirname, '../chrome/mappings'))
        ).map((el) => el.replace(/\.js$/, ''))

        if (mappingsId.includes(storeId)) {
          const storeConfig = require('../chrome/mappings/' + storeId)
          if (storeConfig && storeConfig.product) {
            ctx.body = {
              productLink: storeConfig.product,
            }
            return
          }
        }
      }
    }

    ctx.body = {
      productLink: '',
    }
  }
  static async PUT(ctx) {
    const { storeId, productLink: link } = ctx.request.body

    if (!link || link.startsWith('http')) {
      await Product.findOneAndUpdate(
        { storeId },
        { storeId, link },
        { upsert: true }
      )
    }

    ctx.body = {
      status: 'success',
    }
  }
}
