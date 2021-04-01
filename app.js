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

app.prepare().then(() => {
    const server = new Koa()

    // server.use(async (ctx, next) => {
    //     const start = Date.now()
    //     await next()
    //     const ms = Date.now() - start
    //     console.log(`${ctx.method} ${ctx.url} ${ms}ms`)
    // })

    server.use(cors())
    server.use(bodyParser())
    server.use(router.routes())
    server.use(router.allowedMethods())

    server.use(async (ctx, next) => {
        await handle(ctx.req, ctx.res)
        ctx.response = false
    })

    server.listen(3000, () => {
        console.log(
            'ready - started server on 0.0.0.0:3000, url: http://localhost:3000'
        )
    })
})
