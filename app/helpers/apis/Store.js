const axios = require('axios')

const configAxios = axios.create({
    baseURL: 'https://apis.fatcoupon.com/',
})

configAxios.interceptors.response.use(
    res => res.data.data.data,
    err => Promise.reject(err)
)

class Coupon {
    static async find(storeId) {
        const data = await configAxios.get(`/stores/${storeId}/coupons/all`, {
            params: {
                key: '6Jl4CDXyYddTK7V2erVY9jcmpXqozfu',
            },
        })

        const filterData = data.filter(
            el => el.code.toUpperCase() !== 'fatcoupon'.toUpperCase()
        )

        return filterData
    }

    static async delete(id) {
        await Coupon.delMany([id])
    }

    static async deleteMany(ids) {
        await configAxios.post('/api/extension/coupons/deactivate', {
            coupons: ids,
        })
    }
}

module.exports = Coupon
