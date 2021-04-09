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
        const data = job.attrs.data
        data.status = 'doing'
        data.validCoupons = Array.from(new Set(data.validCoupons))
        data.invalidCoupons = Array.from(new Set(data.invalidCoupons))
        await job.save()

        console.log(`Task <${data.storeName}> (${job.attrs._id}) starting`)
    })

    agenda.on('complete:clearCoupon', async job => {
        const data = job.attrs.data
        data.validCoupons = Array.from(new Set(data.validCoupons))
        data.invalidCoupons = Array.from(new Set(data.invalidCoupons))
        if (
            data.invalidCoupons.length + data.validCoupons.length ===
            data.coupons.length
        ) {
            data.status = 'finished'
        } else {
            await job.disable()
            data.status = 'noFinished'
        }
        await job.save()

        console.log(`Task <${data.storeName}> (${job.attrs._id}) finished`)
    })

    agenda.on('success:clearCoupon', async job => {
        console.log('success:clearCoupon')
    })

    agenda.on('fail:clearCoupon', async job => {
        console.log('fail:clearCoupon')
    })

    return agenda
}
