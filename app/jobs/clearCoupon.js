const run = require('../chrome/index')
const globalConfig = require('../config/config.local')

module.exports = agenda => {
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
                    el =>
                        ![...validCoupons, ...invalidCoupons].includes(el.code)
                )

            if (!sliceCoupons.length) {
                done()
            } else if (sliceCoupons.length > 10) {
                const singleBrowserCouponLength = Math.floor(
                    sliceCoupons.length / globalConfig.concurrency
                )

                while (sliceCoupons.length) {
                    run(
                        storeId,
                        sliceCoupons.splice(
                            0,
                            sliceCoupons.length < singleBrowserCouponLength * 2
                                ? sliceCoupons.length
                                : singleBrowserCouponLength
                        ),
                        job,
                        done
                    )
                }
            } else {
                run(storeId, sliceCoupons, job, done)
            }
        }
    )

    agenda.on('start:clearCoupon', async job => {
        job.attrs.data.status = 'doing'
        job.attrs.data.validCoupons = Array.from(
            new Set(job.attrs.data.validCoupons)
        )
        job.attrs.data.invalidCoupons = Array.from(
            new Set(job.attrs.data.invalidCoupons)
        )
        await job.save()

        console.log(
            `Task <${job.attrs.data.storeName}> (${job.attrs._id}) starting`
        )
    })

    agenda.on('complete:clearCoupon', async job => {
        job.attrs.data.status = 'finished'
        job.attrs.data.validCoupons = Array.from(
            new Set(job.attrs.data.validCoupons)
        )
        job.attrs.data.invalidCoupons = Array.from(
            new Set(job.attrs.data.invalidCoupons)
        )
        await job.save()

        console.log(
            `Task <${job.attrs.data.storeName}> (${job.attrs._id}) finished`
        )
    })
}
