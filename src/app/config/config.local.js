const path = require('path')

module.exports = {
  concurrency: process.env.NODE_ENV === 'production' ? 3 : 1,
  maxFailCount: 3,
  headless: false,
  timeout: 1 * 60 * 1000,
  extensionPath: path.join(__dirname, '../chrome', 'dist'),
  mongoPath:
    process.env.NODE_ENV === 'production'
      ? 'mongodb://chase:372100@localhost:29991/product_code_task?authSource=admin'
      : 'mongodb://localhost:27017/product_code_task',
}
