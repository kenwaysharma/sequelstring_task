const { default: mongoose, mongo } = require("mongoose");




const UserSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["superadmin", "admin"],
        default: "admin"
    }
 /*   
    {
        timestamps
    } */

})

module.exports = mongoose.model('User', UserSchema);
