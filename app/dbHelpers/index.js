const mongoose = require('mongoose')
const globalConfig = require('../config/config.local')

mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
    console.log('> mongodb connected')
})

mongoose.connection.on('disconnected', () => {
    console.log('> mongodb disconnected')
})

mongoose.connection.on('error', () => {
    console.log('> mongodb catch some problem')
})

mongoose.connect(globalConfig.mongoPath, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

const disconnect = async () => {
    await mongoose.disconnect()
}

module.exports = disconnect
