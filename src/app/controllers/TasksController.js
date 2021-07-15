const FatCoupon = require('../apis/FatCoupon')
const Settings = require('../models/Settings')
const queue = require('../jobs/queue')
const redis = require('../db/redis')

let paused = false
const defineStates = [
  'active',
  'completed',
  'delayed',
  'failed',
  'paused',
  'waiting',
]

module.exports = class {
  static async GET(ctx) {
    const query = {
      page: 1,
      size: 10,
      ...ctx.request.query,
    }

    const storeId = query.storeId
    const states = query.states ? query.states.split(',') : defineStates
    const start = (query.page - 1) * query.size
    const end = query.page * query.size
    const storeFilter = query.filter

    const jobs = (await queue.getJobs(states))
      .filter((el) => {
        if (storeId) {
          return storeId === el.data.storeId
        }

        if (storeFilter) {
          const matchValue = new RegExp(storeFilter.replace(/\s/g, ''), 'i')
          const storeInfos =
            el.data.storeName + el.data.domain + el.data.storeId
          return storeInfos.replace(/\s/g, '').match(matchValue)
        }

        return true
      })
      .sort((a, b) => b.id - a.id)

    const total = jobs.length
    const datas = await Promise.all(
      jobs.slice(start, end).map(async (job) => ({
        ...job.data,
        id: job.id,
        state: await job.getState(),
        createdOn: job.timestamp,
        finishedOn: job.finishedOn,
        processedOn: job.processedOn,
        failedReason: job.failedReason,
        attemptsMade: job.attemptsMade,
        allLength: job.data.coupons ? job.data.coupons.length : 0,
        validLength: job.data.coupons
          ? job.data.coupons.filter((el) => el.validStatus === 1).length
          : 0,
        invalidLength: job.data.coupons
          ? job.data.coupons.filter((el) => el.validStatus <= -1).length
          : 0,
      }))
    )

    datas.forEach((el) => delete el.coupons)

    ctx.body = {
      total,
      datas,
      paused,
    }
  }

  static async PUT(ctx) {
    const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

    const {
      storeId,
      storeIds = storeId.split(','),
      autoDeactive,
      promoType,
      priority = 10,
    } = ctx.request.body
    const { formatIP: ip } = ctx.request

    const storeData = JSON.parse(await redis.get('fatcoupon:store'))

    const jobs = await queue.addBulk(
      await Promise.all(
        storeIds.map(async (storeId) => {
          const matchStore = storeData.find((el) => el.id === storeId)
          const storeName = matchStore.name
          const domain = matchStore.domain

          const data = await FatCoupon.getFullCoupons(storeId)

          const coupons =
            data && data.length
              ? data
                  .map((el, index) =>
                    data.map((el) => el.code).indexOf(el.code) === index
                      ? { ...el }
                      : { ...el, validStatus: -1 }
                  )
                  .filter((el) => {
                    if (promoType) {
                      if (promoType !== 'all') {
                        return el.type === promoType
                      }
                    } else if (settings) {
                      if (settings.promoType !== 'all') {
                        return el.type === settings.promoType
                      }
                    }
                    return el.code !== 'FatCoupon'
                  })
              : []

          if (process.env.NODE_ENV !== 'production' && coupons.length >= 5) {
            coupons.splice(20)

            coupons[1].code = 'fakeCode1'
            coupons[3].code = 'fakeCode3'
          }

          return {
            name: 'clean-code',
            data: {
              ip,
              domain,
              coupons,
              storeId,
              storeName,
              autoDeactive,
              promotype: promoType
                ? promoType
                : settings
                ? settings.promoType
                : 'all',
            },
            opts: {
              attempts: settings ? settings.attempts : 3,
              priority,
            },
          }
        })
      )
    )

    ctx.body = {
      ids: jobs.map((el) => el.id),
    }
  }

  static async POST(ctx) {
    if (paused) {
      await queue.resume(true)
    } else {
      await queue.pause(true, true)
      await queue.whenCurrentJobsFinished()
    }

    paused = !paused

    ctx.body = {
      status: 'success',
    }
  }

  static async DELETE_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)
    await job.moveToFailed(
      {
        message: 'delete job',
      },
      true
    )
    await job.remove()

    ctx.body = { status: 'success' }
  }

  static async POST_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)
    const state = await job.getState()
    if (state === 'failed') {
      job.attemptsMade = 0
      await job.update(job.data)
      await job.retry()
    }

    ctx.body = { status: 'success' }
  }

  static async GET_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)

    ctx.body = job
      ? {
          ...job.data,
          id: job.id,
          state: await job.getState(),
          jobLogs: await queue.getJobLogs(job.id),
          createdOn: job.timestamp,
          finishedOn: job.finishedOn,
          processedOn: job.processedOn,
          failedReason: job.failedReason,
          attemptsMade: job.attemptsMade,
          allLength: job.data.coupons.length,
          validLength: job.data.coupons.filter((el) => el.validStatus === 1)
            .length,
          invalidLength: job.data.coupons.filter((el) => el.validStatus <= -1)
            .length,
        }
      : {
          status: 'failed',
        }
  }
}
