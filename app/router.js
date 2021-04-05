const fs = require('fs').promises
const path = require('path')
const axios = require('axios')
const Router = require('koa-router')
const Coupon = require('./helpers/apis/Coupon')
const agenda = require('./jobs/agenda')
const ObjectID = require('mongodb').ObjectID

const router = new Router({
    prefix: '/api',
})

router.get('/tasks', async ctx => {
    const jobs = await agenda.jobs({}, { _id: -1, nextRunAt: 1, priority: -1 })
    const attrs = jobs.map(el => el.attrs)
    const datas = attrs.map(el => ({
        _id: el._id,
        ...el.data,
    }))

    ctx.body = datas
})

router.put('/tasks', async ctx => {
    const body = ctx.request.body
    if (body && body.storeId && body.storeName) {
        const job = await agenda.create('clearCoupon', {
            storeId: body.storeId,
            storeName: body.storeName,
            coupons: await Coupon.find(body.storeId),
            type: 'user',
            status: 'waiting',
        })
        await job.save()

        const datas = {
            _id: job.attrs._id,
            ...job.attrs.data,
        }
        ctx.body = datas
    } else {
        await next()
    }
})

router.delete('/tasks', async ctx => {
    const body = ctx.request.body
    if (body && body.taskId) {
        const count = await agenda.cancel({ _id: ObjectID(body.taskId) })

        ctx.body = { status: 'success', count }
    } else {
        await next()
    }
})

router.get('/stores', async ctx => {
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

router.get('/stores/:id', async ctx => {
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
