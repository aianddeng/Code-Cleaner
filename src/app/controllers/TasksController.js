const Settings = require('../models/Settings')
const queue = require('../jobs/queue')
const axios = require('axios')

let paused = false

module.exports = class {
  static async GET(ctx) {
    const query = {
      size: 10,
      index: 1,
      ...ctx.request.query,
    }

    const types = [
      'active',
      'completed',
      'delayed',
      'failed',
      'paused',
      'waiting',
    ]
    const start = (query.index - 1) * query.size
    const end = query.index * query.size

    const jobs = (await queue.getJobs(types))
      .sort((a, b) => b.id - a.id)
      .slice(start, end)
    const jobCounts = await queue.getJobCounts()

    const total = Object.values(jobCounts).reduce((a, b) => a + b)
    const datas = await Promise.all(
      jobs.map(async (job) => ({
        ...job.data,
        id: job.id,
        state: await job.getState(),
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

    const { storeId, storeName } = ctx.request.body

    const {
      data: {
        data: { data },
      },
    } = await axios.get(
      `https://apis.fatcoupon.com/stores/${storeId}/coupons/all`,
      {
        params: {
          key: '6Jl4CDXyYddTK7V2erVY9jcmpXqozfu',
        },
      }
    )

    const coupons = data
      .map((el) => ({
        id: el.id,
        storeId: el.storeId,
        code: el.code,
        type: el.type,
        priority: el.priority,
        description: el.description,
      }))
      .map((el, index) =>
        data
          .slice()
          .map((el) => el.code)
          .indexOf(el.code) === index
          ? { ...el }
          : { ...el, validStatus: -1 }
      )
      .filter((el) => {
        if (settings && settings.promoType !== 'all') {
          return el.type === settings.promoType
        }
        return true
      })

    if (process.env.NODE_ENV !== 'production' && coupons.length >= 5) {
      coupons.splice(20)

      coupons[1].code = 'fakeCode1'
      coupons[3].code = 'fakeCode3'
    }

    const job = await queue.add(
      'clean-code',
      {
        coupons,
        storeId,
        storeName,
        promotype: settings ? settings.promoType : 'all',
      },
      {
        attempts: settings ? settings.attempts : 3,
      }
    )

    const datas = {
      ...job.data,
      id: job.id,
      state: await job.getState(),
      createdOn: job.timestamp,
      finishedOn: job.finishedOn,
      processedOn: job.processedOn,
      allLength: job.data.coupons.length,
      validLength: job.data.coupons.filter((el) => el.validStatus === 1).length,
      invalidLength: job.data.coupons.filter((el) => el.validStatus <= -1)
        .length,
    }
    ctx.body = datas
  }

  static async POST(ctx) {
    const { action } = ctx.request.body

    switch (action) {
      case 'resume':
        await queue.resume(true)
        paused = false
        break
      case 'pause':
        await queue.pause(true, true)
        paused = true
        break
    }

    ctx.body = {
      status: 'success',
    }
  }

  static async DELETE_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)
    await job.remove()

    ctx.body = { status: 'success' }
  }

  static async POST_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)
    const state = await job.getState()
    if (state === 'failed') {
      await job.retry()
    }

    ctx.body = { status: 'success' }
  }

  static async GET_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)

    ctx.body = {
      ...job.data,
      id: job.id,
      state: await job.getState(),
      createdOn: job.timestamp,
      finishedOn: job.finishedOn,
      processedOn: job.processedOn,
      allLength: job.data.coupons.length,
      validLength: job.data.coupons.filter((el) => el.validStatus === 1).length,
      invalidLength: job.data.coupons.filter((el) => el.validStatus <= -1)
        .length,
    }
  }
}
