const Router = require('koa-router')
const Tasks = require('./models/Tasks')

const router = new Router({
    prefix: '/api',
})

router.get('/tasks', async ctx => {
    const tasks = await Tasks.find({})
    ctx.body = tasks
})

module.exports = router
