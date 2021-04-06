const Agenda = require('agenda')
const run = require('../chrome/index')
const globalConfig = require('../config/config.local')

const agenda = new Agenda()
    .database(globalConfig.mongoPath, 'tasks_queue', {
        useUnifiedTopology: true,
    })
    .name('fatcoupon:clear-coupon')

agenda.define(
    'clearCoupon',
    { priority: 'normal', concurrency: 1 },
    (job, done) => {
        const {
            storeId,
            coupons,
            validCoupons,
            invalidCoupons,
        } = job.attrs.data

        const sliceCoupons = coupons
            .slice()
            .filter(
                el => ![].concat(validCoupons, invalidCoupons).includes(el.code)
            )

        if (sliceCoupons.length > globalConfig.concurrency * 2) {
            const singleBrowserCouponLength = Math.floor(
                sliceCoupons.length / globalConfig.concurrency
            )

            while (sliceCoupons.length) {
                if (sliceCoupons.length < singleBrowserCouponLength * 2) {
                    run(
                        storeId,
                        sliceCoupons.splice(0, sliceCoupons.length),
                        job,
                        done
                    )
                } else {
                    run(
                        storeId,
                        sliceCoupons.splice(0, singleBrowserCouponLength),
                        job,
                        done
                    )
                }
            }
        } else {
            run(storeId, sliceCoupons, job, done)
        }
    }
)

agenda.on('start', async job => {
    job.attrs.data.status = 'doing'
    job.attrs.data.validCoupons = Array.from(
        new Set(job.attrs.data.validCoupons)
    )
    await job.save()

    console.log(
        `Task <${job.attrs.data.storeName}> (${job.attrs._id}) starting`
    )
})

agenda.on('complete', async job => {
    job.attrs.data.status = 'finished'
    job.attrs.data.invalidCoupons = Array.from(
        new Set(job.attrs.data.invalidCoupons)
    )
    await job.save()

    console.log(
        `Task <${job.attrs.data.storeName}> (${job.attrs._id}) finished`
    )
})

agenda.on('ready', async () => {
    console.log('> agenda connected')

    // server restart, continue old jobs
    const lockedJobs = (await agenda.jobs({})).filter(el => el.attrs.lockedAt)
    await Promise.all(
        lockedJobs.map(async el => {
            el.attrs.lockedAt = null
            await el.save()
        })
    )

    // remove not defind jobs
    await agenda.purge((err, numRemoved) => {
        console.log('Remove old tasks: ', numRemoved)
    })

    await agenda.start()
})

module.exports = agenda
