const axios = require('axios')
const isProduction = process.env.NODE_ENV === 'production'
const fatcouponAxios = axios.create({
  baseURL: 'https://apis.fatcoupon.com/',
})

class FatCoupon {
  static async getFullStores() {
    const { data } = await fatcouponAxios.get(`/api/extension/stores`)

    if (!data.errno && data.data && data.data.data) {
      return data.data.data
    }

    return {}
  }

  static async getStoreById(storeId) {
    if (storeId) {
      const { data } = await fatcouponAxios.get(`/stores/${storeId}`)

      if (!data.errno && data.data && data.data.data) {
        return data.data.data
      }
    }

    return {}
  }

  static async getFullCoupons(storeId) {
    if (storeId) {
      const { data } = await fatcouponAxios
        .get(`/stores/${storeId}/coupons/all`, {
          params: {
            key: '6Jl4CDXyYddTK7V2erVY9jcmpXqozfu',
          },
        })
        .catch((_) => ({
          data: {
            errno: 404,
          },
        }))

      if (!data.errno && data.data && data.data.data) {
        return data.data.data.map((el) => ({
          id: el.id,
          storeId: el.storeId,
          code: el.code,
          type: el.type,
          priority: el.priority,
          description: el.description,
        }))
      }
    }

    return []
  }

  static async deactiveCoupons(coupons) {
    if (isProduction) {
      await fatcouponAxios.post(`/api/extension/coupons/deactivate`, {
        coupons,
        key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
      })
    } else {
      console.log('event - remove code:')
      console.table(coupons)
    }
  }
}

module.exports = FatCoupon
