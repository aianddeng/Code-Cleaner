const queue = require('../jobs/queue')
const FatCoupon = require('../apis/FatCoupon')

module.exports = class {
  static async POST(ctx) {
    const { taskId, coupons } = ctx.request.body

    if (coupons && coupons.length) {
      const job = await queue.getJob(taskId)
      job.data.coupons.map(
        (el) =>
          coupons.includes(el.id) &&
          el.validStatus === -1 &&
          (el.validStatus = -2)
      )
      job.data.deactived = true
      await job.update(job.data)

      await job.log(
        JSON.stringify({
          label: Date.now(),
          content:
            'Deactivate codes: ' +
            job.data.coupons
              .filter((el) => el.validStatus === -2)
              .filter((el) => coupons.includes(el.id))
              .map((el) => el.code)
              .join(', '),
        })
      )

      await FatCoupon.deactiveCoupons(coupons)
    }

    ctx.body = {
      status: 'success',
    }
  }
}
