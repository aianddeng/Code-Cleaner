const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema(
  {
    promoType: {
      type: String,
      default: 'all',
      enum: ['all', 'public', 'exclusive'],
    },
    themeType: {
      type: String,
      default: 'white',
      enum: ['dark', 'white'],
    },
    concurrency: {
      type: Number,
      default: 1,
      enum: [1, 2, 3, 4, 5],
    },
    attempts: {
      type: Number,
      default: 3,
      min: 1,
      max: 100,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Settings = mongoose.model('settings', settingsSchema)

module.exports = Settings
