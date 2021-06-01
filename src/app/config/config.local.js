const path = require('path')

module.exports = {
  concurrency: 1,
  maxFailCount: 3,
  headless: false,
  timeout: 2 * 60 * 1000,
  extensionPath: path.join(__dirname, '../chrome', 'dist'),
  mongoPath: 'mongodb://localhost:27017/fatcoupon_cleaner',
}
