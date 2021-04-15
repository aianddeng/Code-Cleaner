const ObjectID = require('mongodb').ObjectID
const Settings = require('../models/Settings')
const agenda = require('../jobs/agenda')
const axios = require('axios')

module.exports = class {
    static async GET(ctx) {
        const jobs = await agenda.jobs(
            { name: 'clearCoupon' },
            { _id: -1, nextRunAt: 1, priority: -1 }
        )

        const attrs = jobs.map(el => el.attrs)
        const datas = attrs.map(el => ({
            _id: el._id,
            disabled: el.disabled,
            lastFinishedAt: el.lastFinishedAt,
            ...el.data,
        }))

        ctx.body = datas
    }

    static async PUT(ctx) {
        const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

        const body = ctx.request.body

        const { data } = await axios.get(
            `https://apis.fatcoupon.com/stores/${body.storeId}/coupons/all`,
            {
                params: {
                    key: '6Jl4CDXyYddTK7V2erVY9jcmpXqozfu',
                },
            }
        )

        const filterData = data.data.data
            .filter(el => el.code.toUpperCase() !== 'fatcoupon'.toUpperCase())
            .filter(el => {
                if (!settings || settings.promoType === 'all') return true
                return el.type === settings.promoType
            })

        const job = await agenda.now('clearCoupon', {
            storeId: body.storeId,
            storeName: body.storeName,
            coupons: filterData,
            promotype: settings ? settings.promoType : '',
            status: 'waiting',
            createdAt: Date.now(),
        })

        const datas = {
            _id: job.attrs._id,
            ...job.attrs.data,
        }
        ctx.body = datas
    }

    static async POST(ctx) {
        const body = ctx.request.body
        const [job] = await agenda.jobs({ _id: ObjectID(body.taskId) })
        if (job) {
            if (job.attrs.disabled) {
                await job.enable()
                job.attrs.failCount = 0
                job.attrs.data.status = 'waiting'
            } else {
                await job.disable()
                job.attrs.data.status = 'disabled'
            }
            await job.save()
            ctx.body = { status: 'success' }
        }
    }

    static async DELETE(ctx) {
        const body = ctx.request.body
        const count = await agenda.cancel({ _id: ObjectID(body.taskId) })

        ctx.body = { status: 'success', count }
    }

    static async GET_ID(ctx) {
        const [job] = await agenda.jobs({
            name: 'clearCoupon',
            _id: ObjectID(ctx.params.id),
        })

        ctx.body = {
            _id: job.attrs._id,
            disabled: job.attrs.disabled,
            lastFinishedAt: job.attrs.lastFinishedAt,
            ...job.attrs.data,
        }
    }
}
