const Settings = require('../models/Settings')

module.exports = class {
    static async GET(ctx) {
        const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)

        ctx.body = settings
            ? settings
            : {
                  status: 'failed',
              }
    }
    static async POST(ctx) {
        const [settings] = await Settings.find({}).sort({ _id: -1 }).limit(1)
        const body = ctx.request.body

        const [afterSettings] = await Settings.insertMany([
            settings
                ? {
                      ...settings,
                      ...body,
                  }
                : body,
        ])

        ctx.body = afterSettings
    }
}
