const User = require("../models/user")

const auth = async (req,res,next)=>{

/* if(req.body.token) ValidityState;
if(user role) checkout;
 */

/* 
1. get cookie
2. validate the user id from the cookie
* Add JWT 
3. send relevant auth data based on the role
*/
const {user, user_role} = req.cookies
console.log('Cookies: ', req.cookies, "user", user, "user_role", user_role)


if(user){
    console.log("User cookie exists.")

    const userDetails = await User.findOne({username: user})
    
    console.log("user role", userDetails.role)
    next()
}else{
    res.json({error:"User not authenticated"})
}




}

module.exports= auth