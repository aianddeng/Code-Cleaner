const Router = require('koa-router')
const TasksController = require('./controllers/TasksController')
const RepeatController = require('./controllers/RepeatController')
const StoresController = require('./controllers/StoresController')
const ProductController = require('./controllers/ProductController')
const CodesController = require('./controllers/CodesController')
const SettingsController = require('./controllers/SettingsController')
const MessageController = require('./controllers/MessageController')

const router = new Router({
  prefix: '/api',
})

router.get('/tasks', TasksController.GET)
router.put('/tasks', TasksController.PUT)
router.post('/tasks', TasksController.POST)

router.get('/tasks/multi', RepeatController.GET)
router.put('/tasks/multi', RepeatController.PUT)
router.delete('/tasks/multi', RepeatController.DELETE)

router.get('/tasks/:id', TasksController.GET_ID)
router.post('/tasks/:id', TasksController.POST_ID)
router.delete('/tasks/:id', TasksController.DELETE_ID)

router.get('/stores', StoresController.GET)
router.get('/stores/:id', StoresController.GET_ID)

router.get('/product', ProductController.GET)
router.put('/product', ProductController.PUT)

router.delete('/coupons', CodesController.DELETE)

router.get('/settings', SettingsController.GET)
router.post('/settings', SettingsController.POST)

router.get('/message', MessageController.GET)
router.put('/message', MessageController.PUT)

module.exports = router
