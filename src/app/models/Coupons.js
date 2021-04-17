const mongoose = require('mongoose')

const couponsSchema = new mongoose.Schema(
  {
    fatcoupon_id: {
      type: String,
    },
    fatcoupon_storeId: {
      type: String,
    },
    code: {
      type: String,
    },
    type: {
      type: String,
      enum: ['exclusive', 'public'],
    },
    priority: {
      type: Number,
    },
    description: {
      type: String,
    },
    validStatus: {
      type: Number,
      enum: [-1, 0, 1],
      default: 0,
    },
    deactivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Coupons = mongoose.model('coupons', couponsSchema)

module.exports = Coupons
