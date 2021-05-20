const run = require('../chrome/index')
const Settings = require('../models/Settings')

module.exports = async (job, done) => {
  const { storeId, coupons } = job.data

  const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

  const unTestCoupon = coupons
    .filter((el) => {
      if (!settings || settings.promoType === 'all') return true
      return el.type === settings.promoType
    })
    .filter((el) => !el.validStatus)

  unTestCoupon.length ? run(storeId, unTestCoupon, job, done) : done()
}
