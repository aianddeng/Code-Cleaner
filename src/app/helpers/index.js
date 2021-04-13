module.exports = class Helpers {
    static async wait(timeLength) {
        await new Promise(resolve => setTimeout(resolve, timeLength * 1000))
    }
}
