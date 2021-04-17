const axios = require('axios')
const agenda = require('../jobs/agenda')
const ObjectID = require('mongodb').ObjectID

module.exports = class {
  static async DELETE(ctx) {
    const body = ctx.request.body

    if (body.coupons) {
      await axios.post(
        'https://apis.fatcoupon.com/api/extension/coupons/deactivate',
        {
          coupons: body.coupons,
          key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
        }
      )
    } else if (body.taskId) {
      const [job] = await agenda.jobs({ _id: ObjectID(body.taskId) })
      if (job) {
        const coupons = job.attrs.data.coupons
        const couponsSlice = coupons.slice().map((el) => el.code)

        const repeatCoupons = coupons.filter(
          (el, index) => couponsSlice.indexOf(el.code) !== index
        )
        const invalidCoupons = coupons.filter((el) => el.validStatus === -1)

        const allCoupons = [...repeatCoupons, ...invalidCoupons].map(
          (el) => el.id
        )

        console.log(allCoupons)

        await axios.post(
          'https://apis.fatcoupon.com/api/extension/coupons/deactivate',
          {
            coupons: allCoupons,
            key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
          }
        )
      }
    }

    // const [job] = await agenda.jobs({ _id: ObjectID(body.taskId) })
    // const deactivateCode = job.attrs.data.coupons.filter(el =>
    //     body.coupons.includes(el.id)
    // )
    // deactivateCode.map(el => (el.deactiveStatus = true))
    // await job.save()

    ctx.body = {
      status: 'success',
    }
  }
}
