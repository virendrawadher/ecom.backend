const mongoose = require('mongoose')
require('mongoose-type-url')
const {Category} = require('./category.model')

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: "Cannot add product without name"
    },
  product_image_url: {
      data: Buffer,
      contentType: String
    },
  description: {
    type: String,
    minLength: [300, "description should be more than 300 words"]
    },
  isInCart: {
    type: Boolean,
    required: false
    },
  isiInWishList: {
    type: Boolean,
    required: false
    },
  price: {
    type: Number,
    required: "Cannot add product without price"
    },
  quantity: Number,
  category: {type: mongoose.Schema.Types.ObjectId, ref: "categorys"}
}, {timestamps: true})

const Product = mongoose.model("products", ProductSchema)

module.exports = { Product }