const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
    software :{
        type : String,
        required : true,
    },
    featuredescription : {
        type : String,
        required : true,
    }
});
module.exports =  mongoose.model("features",featureSchema);