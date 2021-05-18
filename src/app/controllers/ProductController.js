const Product = require('../models/Product')

module.exports = class {
  static async GET(ctx) {
    const { storeId } = ctx.request.query
    const [product] = await Product.find({ storeId }).sort({ _id: -1 }).limit(1)

    ctx.body = product
      ? product
      : {
          status: 'failed',
        }
  }
  static async PUT(ctx) {
    const { storeId, link } = ctx.request.body

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
