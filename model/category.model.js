const mongoose = require("mongoose")
const {Product} = require("./product.model")

const CategorySchema = new mongoose.Schema({
  category_name: {
    type:String,
    unique: true,
    required: "Category Name needed"
    }, 
  name: {
    type: String,
    required: "Can't save data without data"
    }, 
  description: {
    type: String,
    minLength: [300, "Description should be 300 or more"]
    },
  prod: {type: mongoose.Schema.Types.ObjectId, ref: "products"}
}, {timestamps: true})

const Category = mongoose.model("categorys", CategorySchema)

module.exports = {Category}