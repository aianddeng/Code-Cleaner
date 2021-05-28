const UploadController = class {
  static async POST(ctx) {
    ctx.body = JSON.stringify(ctx.request.files)
  }
}

module.exports = UploadController
