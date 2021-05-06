const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RegisterSchema = new Schema({
  // login: [{type: Schema.Types.ObjectId, ref: 'LogIn'}],
  name: {
    type: String,
    maxlength: [16, "Enter the name less than 16"]
  },
  email:{
    type: String,
    maxlength: [100, "Email should not more than 100 letter"]
  },
  password:{
    type: String,
    minlength: [6, "Password should be between 6 - 16 letter"],
    maxlength: [16, "Password should be between 6 - 16 letter"]
  }
}, {timestamps: true})

const Register = mongoose.model('register', RegisterSchema)

module.exports = {Register}