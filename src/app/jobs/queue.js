const Queue = require('bull')
const redis = require('../db/redis')
const run = require('../chrome/index')
const Settings = require('../models/Settings')

const queue = new Queue('fatcoupon', redis.client)

queue.process('clean-code', async (job, done) => {
  const { storeId, coupons } = job.data

  const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

  const unTestCoupon = coupons
    .filter((el) => {
      if (!settings || settings.promoType === 'all') return true
      return el.type === settings.promoType
    })
    .filter((el) => !el.validStatus)

  unTestCoupon.length ? run(storeId, unTestCoupon, job, done) : done()
})

queue.on('waiting', async (jobId) => {
  const job = await queue.getJob(jobId)
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) waiting`)
})

queue.on('active', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) starting`)
})

queue.on('completed', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) completed`)
})

queue.on('failed', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) failed`)
})

queue.on('removed', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) removed`)
})

module.exports = queue
