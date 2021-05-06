const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Cart = mongoose.model('Cart', new Schema({
    product_id:{
      type: Schema.Types.ObjectId 
    },
    cart_name: {
      type: String
    },
    cart_image_url:{
      type: String
    },
    price:{
      type: Number
    },
    quantity:{
      type: Number
    },
    isInCart:{
      type: Boolean
    },
    isInWishList:{
      type: Boolean
    }
}, {timestamps: true}))

module.exports = { Cart }