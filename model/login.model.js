const mongoose = require("mongoose")
const Schema = mongoose.Schema

const LogIn = mongoose.model("login", new Schema({
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
  },
  signup: {type: mongoose.Schema.Types.ObjectId, ref: 'registers'} 
}, {timestamps: true}))

module.exports = {LogIn}