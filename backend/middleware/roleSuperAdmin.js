const User = require("../models/user")


const roleSuperAdmin = async(req,res, next) =>{

console.log("User role", req.cookies.user_role)

const {user_role, user} = req.cookies

const userDetails = await User.findOne({username:user})

if(userDetails && userDetails.role=="superadmin"){
    console.log("Role authenticated - SUPERADMIN")
    next()
}else{
    res.json({error: "You do not have the required permission"})
}

}

module.exports = roleSuperAdmin