const router = require('express').Router()
const {Register} = require("../model/register.model")

router.route("/")
.get(async (req, res) => {
  const user = await Register.find({}).populate({path: 'login', select: ['name']})
  res.json({
    success: true,
    user
  })
})
.post(async(req, res) => {

  const emailExit = await Register.findOne({email: req.body.email})

  if (emailExit) return res.status(200).json({success: false, message: "Email already exit, try to login"})
  const newUser = new Register({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  const saveNewUser = newUser.save()
  res.status(201).json({
    success: true, 
    newUser,
    message: "Sign up successful" 
  })
})

router.param("registerId", async(req, res, next, registerId) => {
  try{
    const getUserById = await Register.findById(registerId)

    if(!getUserById){
      res.status(400).json({
          success: false,
          message: "No user Found"
      })
    }

    req.register = getUserById
    next()
  }catch(error){
    res.status(400).json({
      success: false,
      message: "Error!!! check user"
    })
  }

})

router.route("/:registerId")
.get(async (req, res) => {
  const registerById = req.register
  res.json({
    success: true,
    registerById
  })
})


module.exports = router
