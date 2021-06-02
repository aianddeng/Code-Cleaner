const Queue = require('bull')
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
    data: { ip, storeName, autoDeactive },
    id,
  } = job

  await redis.lpush(
    'fatcoupon:message:' + ip,
    JSON.stringify({
      type: 'success',
      message: 'Task Completed',
      description: `Task <${storeName}> (id: ${id}) is completed. Check it now.`,
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

    job.data.coupons.map(
      (el) =>
        coupons.includes(el.id) &&
        el.validStatus === -1 &&
        (el.validStatus = -2)
    )
    await job.update(job.data)

    await job.log(
      JSON.stringify({
        label: Date.now(),
        content:
          'Auto deactivate codes: ' +
          job.data.coupons
            .filter((el) => el.validStatus === -2)
            .filter((el) => coupons.includes(el.id))
            .map((el) => el.code)
            .join(', '),
      })
    )

    if (process.env.NODE_ENV === 'production') {
      await axios.post(
        'https://apis.fatcoupon.com/api/extension/coupons/deactivate',
        {
          coupons: coupons,
          key: 'NKla7OByeWoYikvnO1Auj0vrfdM8pxq',
        }
      )
    } else {
      console.log('event - remove code:')
      console.table(
        job.data.coupons
          .filter((el) => el.validStatus === -2)
          .filter((el) => coupons.includes(el.id))
          .map((el) => ({
            id: el.id,
            code: el.code,
          }))
      )
    }

    console.log(
      `Task <${storeName}> (id: ${id}) auto deactived invalid coupons.`
    )
  }
})

queue.on('failed', async (job) => {
  const { attemptsMade, attempts, data, id } = job

  if (attemptsMade >= attempts) {
    await redis.lpush(
      'fatcoupon:message:' + data.ip,
      JSON.stringify({
        type: 'error',
        message: 'Task Error',
        description: `Task <${data.storeName}> (id: ${id}) is failed. Please retry it now.`,
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

  console.log(`Task <${data.storeName}> (id: ${id}) failed`)
})

queue.on('removed', async (job) => {
  const { data, id } = job

  console.log(`Task <${data.storeName}> (id: ${id}) removed`)
})

module.exports = queue
