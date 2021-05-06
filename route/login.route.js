const router = require("express").Router()
const {LogIn } = require("../model/login.model")
const {Register} = require("../model/register.model")
router.route("/")
.get(async (req, res) => {
  try{
    const getUser = await LogIn.find().populate({path: 'signup'})
    res.json({
      success: false,
      getUser
    })  
  }catch(error){
    res.json({
      success: false, 
      message: "Enter correct api"
    })
  }
})
.post(async (req, res) => {

  const findUser = await Register.findOne({email: req.body.email})
  // const validEmail = req.body.email === findUser.email
  // console.log(validEmail)

  if(!findUser) return res.json({success: false, message: "Entered email incorrect"})

  const validPass = req.body.password === findUser.password
  console.log(validPass)
  if(!validPass) return res.json({success: false, message: "Entered password incorrect"})

  res.status(201).json({
    success: true, 
    message: "Login successful"
  })
  // const findPassword = await Register.findOne({password: req.body.password})
  // console.log({findPassword})
  // const newLogin = {
  //   email: req.body.email,
  //   password: req.body.password
  // }
  // console.log(newLogin.email)
  // console.log(findUser)
  // if(findUser || findPassword){
  //     if((findUser.email || findPassword.email) === newLogin.email && (findUser.password || findPassword.password) === newLogin.password){
  //       return res.status(201).json({
  //           success: true, 
  //           message: "Login successful"
  //         })
  //       }
  // }

  // return res.json({
  // success: false,
  // message: "Invalid email or password"
  // })
  
  // const saveLogin = newLogin.save()
  
})

router.param("loginId", async (req, res, next, loginId) => {
  try{
      const user = await LogIn.findById(loginId)

    if(!user){
      res.status(400).json({
        success: false, 
        message: "No user found at this id"
      })
    }

    req.login = user
    next()
  }catch(error){
    res.json({
      success: false,
      error
    })
  }

})

router.route("/:loginId")
.get(async (req, res) => {
  try{
    const {login} = req

    res.json({
      success: true,
      login
    })
  }catch(error){
    res.json({
      success: false, 
      error
    })
  }
})
.post(async (req, res) => {
  try{
    const {login} = req
    const filter = {_id: login._id}
    const updateUser = req.body;
    const saveUpdateUser = await LogIn.updateOne(filter, updateUser)
    res.json({
      success: true,
      saveUpdateUser,
      updateUser
    })

  }catch(error){
    res,json({
      success:false,
      error
    })
  }
})
.delete(async (req, res) => {
  try{
    const { login } = req
    const query = {_id: login._id}

    const deleteUser = await LogIn.deleteOne(query)
    res.json({
      success: true,
      deleteUser,
      login
    })
  }catch(error){
    res.json({
      success: false,
      error
    })
  }
})

module.exports = router;