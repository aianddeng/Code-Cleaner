module.exports = class {
  static async POST(ctx) {
    const body = ctx.request.body

    console.log('Git Event Dispatch Body: ', body)

    ctx.body = body
  }
}
