const Agenda = require('agenda')
const globalConfig = require('../config/config.local')
const clearCoupon = require('./clearCoupon')

const agenda = new Agenda()
    .database(globalConfig.mongoPath, 'tasks_queue', {
        useUnifiedTopology: true,
    })
    .name('fatcoupon:clear-coupon')

agenda.on('ready', async () => {
    console.log('> agenda connected')

    const jobs = await agenda.jobs({})
    const lockedJobs = jobs.filter(el => el.attrs.lockedAt)
    await Promise.all(
        lockedJobs.map(async job => {
            job.attrs.lockedAt = null
            await job.save()
        })
    )

    await agenda.purge((err, numRemoved) => {
        console.log('Remove old tasks: ', numRemoved)
    })

    await agenda.start()
})

clearCoupon(agenda)

module.exports = agenda
