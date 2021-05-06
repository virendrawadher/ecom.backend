const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const WishList = mongoose.model('wishlist', new Schema({
  product_id: {
    type: Schema.Types.ObjectId
  },
  isiInWishList: {
    type: Boolean
  },
  product_name: {
    type: String
  },
  product_image_url:{
    type: String
  },
  price: {
    type: Number
  }
}, {timestamps: true}))

module.exports = { WishList }