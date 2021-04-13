const Router = require('koa-router')
const TasksController = require('./controllers/TasksController')
const StoresController = require('./controllers/StoresController')
const CodesController = require('./controllers/CodesController')

const router = new Router({
    prefix: '/api',
})

router.get('/tasks', TasksController.GET)

router.put('/tasks', TasksController.PUT)

router.post('/tasks', TasksController.POST)

router.delete('/tasks', TasksController.DELETE)

router.get('/tasks/:id', TasksController.GET_ID)

router.get('/stores', StoresController.GET)

router.get('/stores/:id', StoresController.GET_ID)

router.delete('/coupons', CodesController.DELETE)

module.exports = router
