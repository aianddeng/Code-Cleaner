const run = require('../chrome/index')
const globalConfig = require('../config/config.local')

module.exports = (agenda) => {
  agenda.define(
    'clearCoupon',
    {
      priority: 'normal',
      lockLimit: globalConfig.concurrency,
      concurrency: globalConfig.concurrency,
      lockLifetime: 30 * 60 * 1000,
    },
    (job, done) => {
      const { storeId, coupons } = job.attrs.data

      const notFinishedCoupons = coupons.filter((el) => !el.validStatus)

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
    const { coupons } = data

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
