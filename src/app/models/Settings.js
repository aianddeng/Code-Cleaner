const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema(
  {
    promoType: {
      type: String,
      default: 'all',
      enum: ['all', 'public', 'exclusive'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Settings = mongoose.model('settings', settingsSchema)

module.exports = Settings
