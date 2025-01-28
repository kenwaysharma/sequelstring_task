var express = require('express');
const User = require('../models/user');
var router = express.Router();
var Cookies = require('cookies')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Create new user */

router.post('/', async (req, res, next)=> {

  const {username,email ,password, role} = req.body;
  console.log("username, email, password", username,email ,password, role)

  const newUser = await User.create({
    username,
    email,
    password,
    role
  })

  newUser.save()

  res.json({newUser})
})

/* Login user */

router.post('/login', async (req, res, next)=> {

  const {username,password} = req.body;
  console.log("username, email, password", username, password)

  const user = await User.findOne({username})
  console.log("username", user)

  if(user){
    console.log("User found!")

    if(user.password != password){
      res.json({message: "User not found. Please check username/password"})
      
    }

    let userCookie = new Cookies(req,res)

    userCookie.set("user",username)
    userCookie.set("user_role",user.role)


    console.log("cookie set?", userCookie.get('user'))
    res.json({message:"Logged in"})
    
  }else{
    res.json({message: "User not found. Please check username/password"})
  }
  

 
})


module.exports = router;
