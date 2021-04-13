require('./app/jobs/agenda')

const next = require('next')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const Koa = require('koa')
    const bodyParser = require('koa-bodyparser')
    const cors = require('koa2-cors')
    const router = require('./app/router')

    new Koa()
        .use(cors())
        .use(bodyParser())
        .use(router.routes())
        .use(router.allowedMethods())
        .use(async ctx => {
            await handle(ctx.req, ctx.res)
            ctx.respond = false
        })
        .listen(80, () => {
            console.log(
                'ready - started server on 0.0.0.0, url: http://localhost'
            )
        })
})
