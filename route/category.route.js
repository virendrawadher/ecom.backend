const express = require('express')
const router = express.Router();
const { Category } = require("../model/category.model")

router.route("/")
.get(async (req, res) => {
  const dBCategory = await Category.find({}).populate('prod')
  res.json({
    success: true, 
    dBCategory
  })
})
.post(async (req, res) => {
  const newCategory = req.body

  const updated = await Category.insertMany(newCategory)
  res.json({
    success: true,
    updated
  })
})

router.param("categoryId", async(req, res, next, categoryId) => {
  try {
    const categoryById = await Category.findById(categoryId)

    if(!categoryById){
      res.json({
        success: false,
        message: "No data of this category id"
      })
    }

    req.category = categoryById
    next()

  }catch(error){
    res.json({
      status: false,
      message: "Error while getting data"
    })
  }
})

router.route("/:categoryId")
.get(async (req, res) => {
  const { category } = req

  res.json({
    success: true,
    category
  })
})
.post(async (req, res) => {
  const { category } = req

  const filter = {categoryID: category.id}
  const updatedCategory = req.body

  const saveUpdatedCategory = await Category.updateOne(filter, updatedCategory)

  res.json({
    success: true,
    updatedCategory
  })
})
.delete(async (req, res) => {
  const {category : {id}} = req

  const filter = {_id: id}

  const deletedCategory = await Category.deleteOne(filter)

  res.json({
    success: true,
    deletedCategory
  })
})

module.exports = router