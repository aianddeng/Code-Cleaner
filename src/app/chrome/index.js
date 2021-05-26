const Scrapy = require('./Scrapy')
const Product = require('../models/Product')
const Mappings = require('../helpers/Mappings')

const run = async (storeId, coupons, job, done) => {
  const [product] = await Product.find({ storeId }).sort({ _id: -1 }).limit(1)

  const mappings = await Mappings.loadMappings()
  const storeConfig = mappings.find((el) => el.storeId === storeId)

  if (product && product.link) {
    storeConfig['product'] = product.link
  }

  new Scrapy(storeConfig, coupons, job, done).start()
}

module.exports = run
