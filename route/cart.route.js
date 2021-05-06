const router = require('express').Router()
const { Cart } = require('../model/cart.model')
const {extend} = require('lodash')


router.route("/")
.get(async (req, res) => {
  try{
      res.json({
      success: true,
      cart : await Cart.find({})
    })
  }catch(err){
    res.status(400).json({
      success: false,
      err
    })
  }
})

.post(async(req, res) => {
  const newCart = req.body
  const saveCart = await Cart.insertMany(newCart)

  res.json({
    success: true,
    newCart
  })

})

router.param('productID', async(req, res, next, productID) => {
  try{
      console.log({productID})
      const cartItemByProductId = await Cart.find({product_id:productID})
      console.log({cartItemByProductId})
      if(!cartItemByProductId){
        res.status(400).json({
          success: false,
          message: "Not item in cart of this name"
        })
      }
      req.cartByProduct = cartItemByProductId
      next()
  }catch(error){
    res.status(400).json({
      success: false, 
      message: error
    })
  } 
})



router.route('/:productID')
.get(async(req, res) => {
  const {cartByProduct} = req
  res.json({
    success: true,
    cartByProduct
  }) 
})
.post(async(req, res) => {
  let { cartByProduct } = req

  console.log({cartByProduct})

  const updateCart = req.body

  console.log({updateCart})

  // const filter = {product_id: cart[0].product_id}

  // console.log({filter})

  cartByProduct = extend(cartByProduct[0], updateCart)

  cartByProduct = await cartByProduct.save()

  // const updateCartData = await Cart.updateOne(filter, updateCart)

  res.json({
    success: true, 
    cartByProduct
    
  })

})

.delete(async(req, res) => {
  const { cartByProduct } = req
  console.log({cartByProduct})
  const query = {product_id: cartByProduct[0].product_id}

  console.log(query)

  const deleteFromCart = await Cart.deleteOne(query)
  res.json({
    success: "deleted",
    cart: cartByProduct,
    query,
    deleteFromCart,
    message: "Removed from cart"
  })
})

// router.param('cartId', async(req, res, next, cartId) => {
//   try{
//       console.log({cartId})
//       const cartItem = await Cart.findById(cartId)
//       console.log({cartItem})
//       if(!cartItem){
//         res.status(400).json({
//           success: false,
//           message: "Not item in cart of this name"
//         })
//       }
//       req.cart = cartItem
//       next()
//   }catch(error){
//     res.status(400).json({
//       success: false, 
//       message: error
//     })
//   } 
// })

// router.route("/item/:cartId")
// .get("")



module.exports = router