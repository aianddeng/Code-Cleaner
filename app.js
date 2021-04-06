// koa
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const router = require('./app/router')

// next
const next = require('next')
const dev = !(process.env.NODE_ENV === 'production')
const app = next({ dev })
const handle = app.getRequestHandler()

// mongoose
const disconnect = require('./app/dbHelpers')
const agenda = require('./app/jobs/agenda')

app.prepare().then(() => {
    const server = new Koa()

    server.use(cors())
    server.use(bodyParser())
    server.use(router.routes())
    server.use(router.allowedMethods())

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    })

    server.listen(80, () => {
        console.log('ready - started server on 0.0.0.0, url: http://localhost')
    })
})
