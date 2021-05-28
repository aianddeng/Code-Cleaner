const Scrapy = require('./Scrapy')
const Product = require('../models/Product')

const run = async (storeId, coupons, job, done) => {
  const storeConfig = require('../chrome/mappings/' + storeId)

  const [product] = await Product.find({ storeId }).sort({ _id: -1 }).limit(1)
  if (product && product.link) {
    storeConfig['product'] = product.link
  }

  new Scrapy(storeConfig, coupons, job, done).start()
}

module.exports = run
