const Agenda = require('agenda')
const Tasks = require('../models/Tasks')
const globalConfig = require('../config/config.local')

const agenda = new Agenda({
    db: {
        address: globalConfig.mongoPath,
        collection: 'tasks_queue',
        options: {
            useUnifiedTopology: true,
        },
    },
    // processEvery: '5 seconds',
    // defaultConcurrency: 5,
    // defaultLockLimit: 0,
    // defaultLockLifetime: 10 * 60 * 1000,
    // sort: { nextRunAt: 1, priority: -1 }
})

agenda.define('clearCoupon', { concurrency: 1 }, async job => {
    const { storeId } = job.attrs.data
    if (storeId) {
        console.log('running...')

        await new Promise(resolve => setTimeout(resolve, 5 * 1000))

        job.attrs.data.status = 'finished'
        await job.save()
    }
})

agenda.on('start', job => {
    console.log(
        `Task <${job.attrs.data.storeName}> (${job.attrs.data.id}) starting`
    )
})

agenda.on('complete', job => {
    console.log(
        `Task <${job.attrs.data.storeName}> (${job.attrs.data.id}) finished`
    )
})

agenda.start()

module.exports = agenda
