const axios = require('axios')
const queue = require('../jobs/queue')

module.exports = class {
  static async DELETE(ctx) {
    const { taskId, coupons } = ctx.request.body

    if (coupons && coupons.length) {
      const job = await queue.getJob(taskId)
      job.data.coupons.map(
        (el) =>
          coupons.includes(el.id) &&
          el.validStatus === -1 &&
          (el.validStatus = -2)
      )
      await job.update(job.data)

      if (process.env.NODE_ENV === 'production') {
        await axios.post(
          'https://apis.fatcoupon.com/api/extension/coupons/deactivate',
          {
            coupons: coupons,
            key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
          }
        )
      } else {
        console.log('remove code: ', coupons)
      }
    }

    ctx.body = {
      status: 'success',
    }
  }
}
