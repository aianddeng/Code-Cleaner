const run = require('../chrome/index')

module.exports = async (job, done) => {
  const { storeId, coupons } = job.data

  const unTestCoupon = coupons.filter((el) => !el.validStatus)

  unTestCoupon.length ? run(storeId, unTestCoupon, job, done) : done()
}
