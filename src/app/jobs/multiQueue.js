const Queue = require('bull')
const redis = require('../db/redis')
const repeatTask = require('./repeatTask')

const multiQueue = new Queue('fatcoupon-multi', redis.client)
multiQueue.process('*', repeatTask)

module.exports = multiQueue
