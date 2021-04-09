const fs = require('fs').promises
const path = require('path')
const axios = require('axios')
const Router = require('koa-router')
const ObjectID = require('mongodb').ObjectID
const agenda = require('./jobs/agenda')
const Coupon = require('./helpers/apis/Coupon')

const router = new Router({
    prefix: '/api',
})

router.get('/coupons/:id', async (ctx, next) => {
    const [job] = await agenda.jobs({
        name: 'clearCoupon',
        _id: ObjectID(ctx.params.id),
    })

    if (job) {
        ctx.body = {
            _id: job.attrs._id,
            disabled: job.attrs.disabled,
            lastFinishedAt: job.attrs.lastFinishedAt,
            ...job.attrs.data,
        }
    } else {
        await next()
    }
})

router.get('/tasks', async (ctx, next) => {
    const jobs = await agenda.jobs(
        { name: 'clearCoupon' },
        { _id: -1, nextRunAt: 1, priority: -1 }
    )
    if (jobs.length) {
        const attrs = jobs.map(el => el.attrs)
        const datas = attrs.map(el => ({
            _id: el._id,
            disabled: el.disabled,
            lastFinishedAt: el.lastFinishedAt,
            ...el.data,
        }))

        ctx.body = datas
    } else {
        await next()
    }
})

router.put('/tasks', async (ctx, next) => {
    const body = ctx.request.body
    if (body && body.storeId && body.storeName) {
        const coupons = await Coupon.find(body.storeId)

        const job = await agenda.now('clearCoupon', {
            storeId: body.storeId,
            storeName: body.storeName,
            coupons,
            validCoupons: [],
            invalidCoupons: [],
            type: 'user',
            status: 'waiting',
            createdAt: Date.now(),
        })

        const datas = {
            _id: job.attrs._id,
            ...job.attrs.data,
        }
        ctx.body = datas
    } else {
        await next()
    }
})

router.post('/tasks', async (ctx, next) => {
    const body = ctx.request.body
    if (body && body.taskId) {
        const [job] = await agenda.jobs({ _id: ObjectID(body.taskId) })
        if (job) {
            if (job.attrs.disabled) {
                await job.enable()
                job.attrs.data.status = 'waiting'
            } else {
                await job.disable()
                job.attrs.data.status = 'disabled'
            }
            job.save()
            ctx.body = { status: 'success' }
        }
    } else {
        await next()
    }
})

router.delete('/tasks', async (ctx, next) => {
    const body = ctx.request.body
    if (body && body.taskId) {
        const count = await agenda.cancel({ _id: ObjectID(body.taskId) })

        ctx.body = { status: 'success', count }
    } else {
        await next()
    }
})

router.get('/stores', async (ctx, next) => {
    const { data } = await axios.get(
        'https://apis.fatcoupon.com/api/extension/stores'
    )

    if (data) {
        const mappings = (
            await fs.readdir(path.join(__dirname, 'chrome', 'mappings'))
        ).map(el => el.replace(/\.js/, ''))

        ctx.body = data.data.data
            .sort((a, b) => b.priority - a.priority)
            .map(el => ({
                id: el.id,
                name: el.name,
                domain: el.domain,
                mapping: mappings.includes(el.id),
            }))
    } else {
        await next()
    }
})

router.get('/stores/:id', async (ctx, next) => {
    const { data } = await axios.get(
        'https://apis.fatcoupon.com/stores/' + ctx.params.id
    )

    if (data) {
        ctx.body = data.data.data
    } else {
        await next()
    }
})

module.exports = router
