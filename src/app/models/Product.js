const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: String,
      required: true,
      unique: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product
