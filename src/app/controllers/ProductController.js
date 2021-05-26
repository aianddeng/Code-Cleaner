const Product = require('../models/Product')
const Mappings = require('../helpers/Mappings')

class ProductController {
  static async GET(ctx) {
    const { storeId } = ctx.request.query

    if (storeId) {
      const mappings = await Mappings.loadMappings()
      const storeConfig = mappings.find((el) => el.storeId === storeId)

      const [product] = await Product.find({ storeId })
        .sort({ _id: -1 })
        .limit(1)
      if (product && product.link) {
        storeConfig['product'] = product.link
      }

      ctx.body = {
        productLink: storeConfig['product'],
      }
    } else {
      ctx.body = {
        status: 'failed',
      }
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

module.exports = ProductController
