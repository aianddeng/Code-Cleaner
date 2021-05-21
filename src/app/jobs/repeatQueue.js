const Queue = require('bull')
const redis = require('../db/redis')
const repeatTask = require('./repeatTask')

const repeatQueue = new Queue('fatcoupon-repeat', redis.client)
repeatQueue.process('*', repeatTask)

module.exports = repeatQueue
