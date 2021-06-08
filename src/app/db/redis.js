const Redis = require('ioredis')
const axios = require('axios')

const FatCoupon = require('../apis/FatCoupon')
const redis = new Redis()

const loadStoreList = async () => {
  console.log('> Reload Store List')
  const data = await FatCoupon.getFullStores()
  await redis.set('fatcoupon:store', JSON.stringify(data))

  setTimeout(loadStoreList, 1 * 60 * 60 * 1000)
}

redis.on('connect', () => {
  console.log('event - redis connected')
})

redis.on('ready', () => {
  console.log('event - redis ready')

  setTimeout(loadStoreList, 0)
})

module.exports = redis
