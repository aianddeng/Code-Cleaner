const Settings = require('../models/Settings')
const queue = require('../jobs/queue')
const axios = require('axios')

module.exports = class {
  static async GET(ctx) {
    const query = {
      ...ctx.request.query,
      size: 10,
      index: 1,
    }

    const jobs = await queue.getJobs(
      ['active', 'completed', 'delayed', 'failed', 'paused', 'waiting'],
      (query.index - 1) * query.size,
      query.index * query.size
    )
    const jobCounts = await queue.getJobCounts()

    const datas = jobs
      .map((job) => ({
        ...job.data,
        id: job.id,
        createdOn: job.timestamp,
        finishedOn: job.finishedOn,
        processedOn: job.processedOn,
        allLength: job.data.coupons.length,
        validLength: job.data.coupons.filter((el) => el.validStatus === 1)
          .length,
        invalidLength: job.data.coupons.filter((el) => el.validStatus === -1)
          .length,
      }))
      .sort((a, b) => b.id - a.id)

    const total = Object.values(jobCounts).reduce((a, b) => a + b)

    ctx.body = {
      total,
      datas,
    }
  }

  static async PUT(ctx) {
    const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

    const body = ctx.request.body

    const { data } = await axios.get(
      `https://apis.fatcoupon.com/stores/${body.storeId}/coupons/all`,
      {
        params: {
          key: '6Jl4CDXyYddTK7V2erVY9jcmpXqozfu',
        },
      }
    )

    const job = await queue.add('clean-code', {
      storeId: body.storeId,
      storeName: body.storeName,
      coupons: data.data.data
        .filter((el) => el.code !== 'FatCoupon')
        .map((el) => ({
          id: el.id,
          storeId: el.storeId,
          code: el.code,
          type: el.type,
          priority: el.priority,
          description: el.description,
        })),
      promotype: settings ? settings.promoType : '',
      status: 'waiting',
    })

    const datas = {
      ...job.data,
      id: job.id,
      createdOn: job.timestamp,
      finishedOn: job.finishedOn,
      processedOn: job.processedOn,
      allLength: job.data.coupons.length,
      validLength: job.data.coupons.filter((el) => el.validStatus === 1).length,
      invalidLength: job.data.coupons.filter((el) => el.validStatus === -1)
        .length,
    }
    ctx.body = datas
  }

  static async POST(ctx) {
    const { action } = ctx.request.body

    switch (action) {
      case 'resume':
        await queue.resume(true)
      case 'pause':
        await queue.pause(true)
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
      createdOn: job.timestamp,
      finishedOn: job.finishedOn,
      processedOn: job.processedOn,
      allLength: job.data.coupons.length,
      validLength: job.data.coupons.filter((el) => el.validStatus === 1).length,
      invalidLength: job.data.coupons.filter((el) => el.validStatus === -1)
        .length,
    }
  }
}
