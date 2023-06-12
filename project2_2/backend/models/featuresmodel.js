const mongoose = require("mongoose");

const featureSchema = new mongoose.Schema({
    software :{
        type : String,
        required : true,
    },
    featuredescription : {
        type : String,
        required : true,
    },
    featurepriority : {
        type : Number,
        default : 0,
    },
    featurestatus : {
        type : Number,
        default : 0,
    }
});
module.exports =  mongoose.model("features",featureSchema);