const path = require('path')

console.log(path.join(__dirname, '../', 'dist', 'extension'))
module.exports = {
    concurrency: 3,
    headless: false,
    extensionPath:
        process.NODE_ENV === 'production'
            ? path.join(__dirname, '../', 'dist', 'extension')
            : '/Users/chase/Work-Base/fatcoupon-xtension/dist/extension-production-local',
    mongoPath:
        process.NODE_ENV === 'production'
            ? 'mongodb://chase:372100@us.forden.cn:27017/product_code_task?authSource=admin'
            : 'mongodb://localhost:27017/product_code_task',
}
