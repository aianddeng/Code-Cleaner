const Scrapy = require('./Scrapy')

const run = async (storeId, coupons, job, done) => {
  const storeConfig = require('./mappings/' + storeId + '.js')

  const store = new Scrapy(storeConfig, coupons, job, done)
  await store.start()
}

module.exports = run
