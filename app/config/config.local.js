const path = require('path')

module.exports = {
    concurrency: 1,
    headless: false,
    timeout: 1 * 60 * 1000,
    extensionPath:
        process.env.NODE_ENV === 'production'
            ? path.join(__dirname, '../../', 'dist')
            : '~/Work-Base/fatcoupon-xtension/dist/extension-production-local',
    mongoPath:
        process.env.NODE_ENV === 'production'
            ? 'mongodb://chase:372100@us.forden.cn:27017/product_code_task?authSource=admin'
            : 'mongodb://localhost:27017/product_code_task',
}
