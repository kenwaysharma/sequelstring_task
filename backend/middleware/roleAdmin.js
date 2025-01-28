const User = require("../models/user")


const roleAdmin = async(req,res, next) =>{

console.log("User role", req.cookies.user_role)

const {user_role, user} = req.cookies

const userDetails = await User.findOne({username})

if(userDetails && userDetails.role=="admin"){
    console.log("Role authenticated - ADMIN")
    next()
}else{
    res.json({error: "You do not have the required permission"})
}

}

module.exports = roleAdmin