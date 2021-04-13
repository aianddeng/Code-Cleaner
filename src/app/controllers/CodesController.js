const axios = require('axios')
const agenda = require('../jobs/agenda')
const ObjectID = require('mongodb').ObjectID

module.exports = class {
    static async DELETE(ctx) {
        const body = ctx.request.body

        await axios.post(
            'https://apis.fatcoupon.com/api/extension/coupons/deactivate',
            {
                coupons: body.coupons,
                key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
            }
        )

        // const [job] = await agenda.jobs({ _id: ObjectID(body.taskId) })
        // const deactivateCode = job.attrs.data.coupons.filter(el =>
        //     body.coupons.includes(el.id)
        // )
        // deactivateCode.map(el => (el.deactiveStatus = true))
        // await job.save()

        ctx.body = {
            status: 'success',
            deactivateCode,
        }
    }
}
