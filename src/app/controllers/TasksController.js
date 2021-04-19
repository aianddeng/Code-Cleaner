const Settings = require('../models/Settings')
const Coupons = require('../models/Coupons')
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

    const total = Object.values(await queue.getJobCounts()).reduce(
      (a, b) => a + b
    )

    const datas = (
      await Promise.all(
        jobs.filter(Boolean).map(async (el) => {
          const coupons = await Coupons.find({
            $or: el.data.coupons.map((el) => ({ _id: el })),
          })
          return {
            id: el.id,
            disabled: false,
            lastFinishedAt: el.finishedOn,
            allLength: coupons.length,
            validLength: coupons.filter((el) => el.validStatus === 1).length,
            invalidLength: coupons.filter((el) => el.validStatus === -1).length,
            ...el.data,
          }
        })
      )
    ).sort((a, b) => b.id - a.id)

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

    const coupons_result = await Coupons.insertMany(
      data.data.data
        .filter((el) => el.code !== 'FatCoupon')
        .map((el) => ({
          fatcoupon_id: el.id,
          fatcoupon_storeId: el.storeId,
          code: el.code,
          type: el.type,
          priority: el.priority,
          description: el.description,
        }))
    )

    const filterData = coupons_result.map((el) => el._id)

    const job = await queue.add('clean-code', {
      storeId: body.storeId,
      storeName: body.storeName,
      coupons: filterData,
      promotype: settings ? settings.promoType : '',
      status: 'waiting',
      createdAt: Date.now(),
    })

    const datas = {
      id: job.id,
      ...job.data,
    }
    ctx.body = datas
  }

  static async POST(ctx) {
    const { action } = ctx.request.body

    switch (action) {
      case 'resume':
        await queue.resume()
      case 'pause':
        await queue.pause()
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
    job.retry()

    ctx.body = { status: 'success' }
  }

  static async GET_ID(ctx) {
    const { id } = ctx.params

    const job = await queue.getJob(id)

    const coupons = await Coupons.find({
      $or: job.data.coupons.map((el) => ({ _id: el })),
    })

    ctx.body = {
      ...job.data,
      id: job.id,
      disabled: false,
      lastFinishedAt: job.finishedOn,
      allLength: coupons.length,
      validLength: coupons.filter((el) => el.validStatus === 1).length,
      invalidLength: coupons.filter((el) => el.validStatus === -1).length,
      coupons: await Coupons.find({
        $or: job.data.coupons.map((el) => ({ _id: el })),
      }),
    }
  }
}
