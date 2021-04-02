const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connection.on('connected', () => {
    console.log('mongodb connected')
})

mongoose.connection.on('disconnected', () => {
    console.log('mongodb disconnected')
})

mongoose.connection.on('error', () => {
    console.log('mongodb catch some problem')
})

mongoose.connect('mongodb://localhost:27017/product_code_task', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})

module.exports = async () => {
    await mongoose.disconnect()
}
