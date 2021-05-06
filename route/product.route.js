const express = require('express')
const router = express.Router()
const {extend} = require('lodash')
const { Product } = require("../model/product.model")


router.route("/")
.get(async(req, res) => {
  const findProduct = await Product.find({}).populate("category")
  res.json({
    success: true,
    findProduct
  })
})
.post(async(req, res) => {
  const newProduct = req.body

  const saveNewProduct = await Product.insertMany(newProduct)

  res.status(201).json({
    success: true,
    saveNewProduct
  })
})

router.param("productId", async(req, res, next, productId)=> {
  try{
      const productById = await Product.findById(productId)
      console.log({productById})
    if(!productById){
      res.status(400).json({
        success: false, 
        message: "No product of this id"
      })
    }
    req.product = productById
    next()
  }catch(error){
    res.status(400).json({
      success: false, 
      message: "Error while fetching data at this id"
    })
  }
})

router.route(`/:productId`)
.get(async(req, res) => {

  const { product } = req

  res.json({
    success: true,
    product
  })
})
.post(async (req, res) => {
  let { product } = req
  console.log("inside post", product)
  const updateProduct = req.body
  console.log({updateProduct})

  const filter = {_id: product._id}
  console.log({filter})

  product = await extend(product, updateProduct).save()
  console.log(product)

  // const updatedProduct = await Product.updateOne(filter, updateProduct)

  res.json({
    success: true, 
    // updatedProduct
    product

  })
})
.delete(async (req, res) => {
  const {product} = req

  const filter = {_id: product.id}

  const deletedProduct = await Product.deleteOne(filter)

  res.json({
    success: true, 
    deletedProduct
  })
})

router.param("productByCategoryId", async(req, res, next, productByCategoryId)=> {
  try{
      console.log({productByCategoryId})
      const productByCateg = await Product.find({category: productByCategoryId})

    if(!productByCateg){
      res.status(400).json({
        success: false, 
        message: "No product of this id"
      })
    }
    req.productByCategory = productByCateg
    next()
  }catch(error){
    res.status(400).json({
      success: false, 
      message: "Error while fetching data at this id"
    })
  }
})

router.route("/category/:productByCategoryId")
.get(async (req, res) => {
  const {productByCategory} = req

  res.json({
    success: true,
    productByCategory
  })
})



module.exports = router