const Queue = require('bull')
const axios = require('axios')
const redis = require('../db/redis')
const cleanCode = require('./cleanCode')

const queue = new Queue('fatcoupon', redis.client)
const isProduction = process.env.NODE_ENV === 'production'

queue.process('clean-code', isProduction ? 3 : 1, cleanCode)

queue.on('waiting', async (jobId) => {
  const job = await queue.getJob(jobId)
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) waiting`)
})

queue.on('active', async (job) => {
  const { data, id } = job

  await job.log(
    JSON.stringify({
      label: Date.now(),
      content: `Starting run current job...`,
    })
  )

  console.log(`Task <${data.storeName}> (id: ${id}) starting`)
})

queue.on('completed', async (job) => {
  const {
    data: { ip, storeName, autoDeactive, storeId },
    id,
  } = job

  await redis.lpush(
    'fatcoupon:message:' + ip,
    JSON.stringify({
      type: 'success',
      date: Date.now(),
      id,
      storeName,
      storeId,
    })
  )

  await job.log(
    JSON.stringify({
      color: 'green',
      label: Date.now(),
      content: `Current job completed`,
    })
  )

  console.log(`Task <${storeName}> (id: ${id}) completed`)

  if (autoDeactive) {
    const coupons = job.data.coupons
      .filter((el) => el.validStatus === -1)
      .map((el) => el.id)

    await axios.post('/api/coupons/deactivate', {
      taskId: id,
      coupons,
    })

    console.log(
      `Task <${storeName}> (id: ${id}) auto deactived invalid coupons.`
    )
  }
})

queue.on('failed', async (job) => {
  const {
    attemptsMade,
    opts: { attempts },
    data: { ip, storeName, storeId },
    id,
  } = job

  if (attemptsMade >= attempts) {
    await redis.lpush(
      'fatcoupon:message:' + ip,
      JSON.stringify({
        type: 'error',
        date: Date.now(),
        id,
        storeName,
        storeId,
      })
    )
  }

  await job.log(
    JSON.stringify({
      color: 'red',
      label: Date.now(),
      content: `Current job failed`,
    })
  )

  console.log(`Task <${storeName}> (id: ${id}) failed`)
})

queue.on('removed', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) removed`)
})

module.exports = queue
