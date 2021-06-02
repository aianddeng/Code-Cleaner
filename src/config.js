const path = require('path')

module.exports = {
  port: 3000,
  concurrency: 1,
  maxFailCount: 3,
  headless: false,
  timeout: 2 * 60 * 1000,
  extensionPath: path.join(__dirname, 'app', 'chrome', 'dist'),
  mongoPath: 'mongodb://localhost:27017/fatcoupon_cleaner',
}
