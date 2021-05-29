require('./app/db/mongodb')
require('./app/db/redis')
require('./app/jobs/queue')

const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const router = require('./app/router')

const next = require('next')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  server.proxy = true
  server
    .use(cors())
    .use(async (ctx, next) => {
      const ip =
        ctx.request.headers['x-forwarded-for'] ||
        ctx.request.ip ||
        ctx.request.connection.remoteAddress ||
        ctx.request.socket.remoteAddress ||
        ctx.request.connection.socket.remoteAddress

      ctx.request.formatIP = ip ? ip.replace('::ffff:', '') : ''
      await next()
    })
    .use(
      koaBody({
        strict: false,
        multipart: true,
        formidable: {
          uploadDir: path.join(__dirname, './app/upload'),
          keepExtensions: true,
          onFileBegin: (name, file) => {
            if (name === 'mappings') {
              file.path = path.join(
                __dirname,
                './app/chrome/mappings',
                file.name
              )

              delete require.cache[file.path]
            } else if (name === 'connectors') {
              file.path = path.join(
                __dirname,
                './app/chrome/dist/stores',
                file.name
              )
            }
          },
        },
      })
    )
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })
    .listen(80, () => {
      console.log('ready - started server on 0.0.0.0, url: http://localhost')
    })
})
