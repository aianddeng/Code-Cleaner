const run = require('../chrome/index')
const globalConfig = require('../config/config.local')
const Coupons = require('../models/Coupons')
const Settings = require('../models/Settings')

module.exports = (agenda) => {
  agenda.define(
    'clearCoupon',
    {
      priority: 'normal',
      lockLimit: globalConfig.concurrency,
      concurrency: globalConfig.concurrency,
      lockLifetime: 30 * 60 * 1000,
    },
    async (job, done) => {
      const { storeId, coupons } = job.attrs.data

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
    }
  )

  agenda.on('start:clearCoupon', async (job) => {
    const data = job.attrs.data

    data.status = 'doing'
    await job.save()

    console.log(`Task <${data.storeName}> (${job.attrs._id}) starting`)
  })

  agenda.on('complete:clearCoupon', async (job) => {
    const data = job.attrs.data
    const coupons = await Promise.all(
      data.coupons.map((el) => Coupons.findById(el))
    )

    if (coupons.every((el) => el.validStatus)) {
      data.status = 'finished'
    } else {
      if (
        job.attrs.failCount &&
        job.attrs.failCount < globalConfig.maxFailCount
      ) {
        job.run()
      } else {
        await job.disable()
        data.status = 'disabled'
      }
      job.attrs.lastFinishedAt = null
    }
    await job.save()

    console.log(`Task <${data.storeName}> (${job.attrs._id}) completed`)
  })

  agenda.on('success:clearCoupon', async (job) => {
    // console.log('success:clearCoupon')
  })

  agenda.on('fail:clearCoupon', async (job) => {
    // console.log('fail:clearCoupon')
  })

  return agenda
}
