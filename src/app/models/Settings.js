const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema(
  {
    promoType: {
      type: String,
      default: 'all',
      enum: ['all', 'public', 'exclusive'],
    },
    concurrency: {
      type: Number,
      default: 1,
      enum: [1, 2, 3],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Settings = mongoose.model('settings', settingsSchema)

module.exports = Settings
