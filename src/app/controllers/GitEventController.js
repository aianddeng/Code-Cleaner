module.exports = class {
  static async GET(ctx) {
    ctx.body = {
      success: true,
    }
  }
  static async POST(ctx) {
    const body = ctx.request.body

    console.log('Git Event Dispatch Body: ', body)

    ctx.body = body
  }
}
