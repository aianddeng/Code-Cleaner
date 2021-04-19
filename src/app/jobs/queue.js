const client = require('../db/redis').client
const Queue = require('bull')
const Coupons = require('../models/Coupons')
const Settings = require('../models/Settings')
const run = require('../chrome/index')

const queue = new Queue('fatcoupon', client)

queue.process('clean-code', async (job, done) => {
  const { storeId, coupons } = job.data

  const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

  const notFinishedCoupons = (
    await Promise.all(coupons.map((el) => Coupons.findById(el)))
  )
    .filter((el) => {
      if (!settings || settings.promoType === 'all') return true
      return el.type === settings.promoType
    })
    .filter((el) => !el.validStatus)

  notFinishedCoupons.length
    ? run(storeId, notFinishedCoupons, job, done)
    : done()
})

queue.on('active', async (job) => {
  const { data, id } = job

  await job.update({
    ...data,
    status: 'doing',
  })

  console.log(`Task <${data.storeName}> (id: ${id}) starting`)
})

queue.on('completed', async (job) => {
  const { data, id } = job

  const coupons = await Promise.all(
    data.coupons.map((el) => Coupons.findById(el))
  )

  if (coupons.every((el) => el.validStatus)) {
    await job.update({
      ...data,
      status: 'finished',
    })
  } else {
    await job.update({
      ...data,
      status: 'disabled',
    })
  }

  console.log(`Task <${data.storeName}> (id: ${id}) completed`)
})

queue.on('failed', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) failed`)
})

queue.on('removed', async () => {
  console.log(`Some task removed`)
})

module.exports = queue
