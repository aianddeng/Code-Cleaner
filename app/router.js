const fs = require('fs').promises
const path = require('path')
const axios = require('axios')
const Router = require('koa-router')
const Tasks = require('./models/Tasks')
const agenda = require('./jobs/agenda')

const router = new Router({
    prefix: '/api',
})

router.get('/tasks', async ctx => {
    const tasks = await Tasks.find({}).sort({ _id: -1 })
    ctx.body = tasks
})

router.put('/tasks', async ctx => {
    const body = ctx.request.body
    if (body && body.storeId && body.storeName) {
        const task = new Tasks({
            storeId: body.storeId,
            storeName: body.storeName,
            type: 'user',
        })
        const result = await task.save()

        const task_ = await agenda.create('clearCoupon', {
            id: result._id,
            storeId: body.storeId,
            storeName: body.storeName,
        })
        await task_.save()

        ctx.body = result
    } else {
        await next()
    }
})

router.delete('/tasks', async ctx => {
    const body = ctx.request.body
    if (body && body.taskId) {
        const result = await Tasks.findByIdAndDelete(body.taskId)

        await agenda.cancel({ data: { id: result._id } })

        ctx.body = result
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
