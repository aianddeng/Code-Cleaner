require('./app/db/mongodb')
require('./app/db/redis')

const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const session = require('koa-session')

const axios = require('axios')
const globalConfig = require('./config')
axios.defaults.baseURL = `http://127.0.0.1:${globalConfig.port}`

const next = require('next')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const ips = require('./white')
  const router = require('./app/router')

  const server = new Koa()
  server.proxy = true
  server.keys = ['admin.fatcoupon.com']
  server
    .use(cors())
    .use(
      session(
        {
          key: 'ip_access',
          maxAge: 3.5 * 24 * 60 * 60 * 1000,
          renew: true,
        },
        server
      )
    )
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
    .use(async (ctx, next) => {
      const ip = ctx.request.formatIP

      if (ctx.session.accessIP || ips.includes(ip)) {
        if (!ctx.session.accessIP) {
          ctx.session.accessIP = ip
        }
        await next()
      } else {
        ctx.status = 403
        ctx.body = `No Access. (ip: ${ip})`
      }
    })
    .use(
      koaBody({
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
    .listen(globalConfig.port, () => {
      console.log(
        `ready - started server on 0.0.0.0:${globalConfig.port}, url: http://localhost:${globalConfig.port}`
      )
    })
})
