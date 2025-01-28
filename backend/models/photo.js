const { default: mongoose, Schema } = require("mongoose");




const PhotoSchema = mongoose.Schema({
    name: String,
    destination: String,
    url: String,
    originalName: String,
    viewed: {
        type: Boolean,
        default: false
    },
    uploadedBy: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }]
})


module.exports = mongoose.model("Photo", PhotoSchema)