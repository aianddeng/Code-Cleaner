const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
        taskId: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        type: String,
        source: String,
        status: Number,
        priority: Number,
        description: String,
        storeId: String,
        valid: {
            type: Number,
            default: 0,
            enum: [-1, 0, 1],
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
)

const Coupon = mongoose.model('coupon', couponSchema)

module.exports = Coupon
