const axios = require('axios')

module.exports = class {
  static async DELETE(ctx) {
    const body = ctx.request.body

    if (body.coupons) {
      console.log('remove code: ', body.coupons)
      await axios.post(
        'https://apis.fatcoupon.com/api/extension/coupons/deactivate',
        {
          coupons: body.coupons,
          key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
        }
      )
    }

    ctx.body = {
      status: 'success',
    }
  }
}
