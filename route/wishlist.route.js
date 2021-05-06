const router = require('express').Router()
const { extend } = require('lodash')
const { WishList } = require('../model/wishlist.model')

router.route('/')
.get(async(req, res) => {
  console.log({WishList})
  const getWishList = await WishList.find({})

  res.json({
    success: true,
    wishlist: getWishList
  })
})

.post(async(req, res) => {
  const newWishlist = req.body
  console.log(newWishlist)
  const saveWislist = await new WishList(newWishlist).save()

  res.json({
    success: true,
    saveWislist
  })
})

router.param("wishlistId", async(req, res, next, wishlistId) => {
  try{
      const wishListByProductId = await WishList.find({product_id: wishlistId})

    if(!wishListByProductId){
      res.json({
        success: false,
        message: "No product of this name in wishlist"
      })
    }
    req.wishlist = wishListByProductId
    next()
  }catch(error){
    res.json({
      success: false,
      error
    })
  }

})

router.route("/:wishlistId")
.get(async (req, res) => {
  const { wishlist} = req

  res.json({
    success: true,
    wishlist
  })
})
.patch(async(req, res) => {
  let { wishlist } = req

  const updateWishlist = req.body

  wishlist = await extend(wishlist[0], updateWishlist).save()

  res.json({
    success: true,
    wishlist
  }) 
})

.delete(async(req, res) => {
  let { wishlist } = req

  const filter = {product_id: wishlist[0].product_id}
  const deleteWishList = await WishList.deleteOne(filter)
  // const getWishList = await WishList.find({})

  res.json({
    success: true,
    message: "deleted",
    deleteWishList
  })
})


module.exports = router