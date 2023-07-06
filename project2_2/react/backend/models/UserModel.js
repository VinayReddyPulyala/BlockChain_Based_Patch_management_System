const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Username is required"],
        unique : true
    },
    password: {
        type :String,
        required : [true,"Password is required"]
    },
    role:{
        type:String,
        default:"End_User",
        required : true
    }
});


module.exports = mongoose.model("users",userSchema);