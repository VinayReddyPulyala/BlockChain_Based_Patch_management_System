const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
    software :{
        type : String,
        required : true,
    },
    bugdesc : {
        type : String,
        required : true
    },
    bugpriority : {
        type : Number,
        default : 0
    },
    bugstatus : {
        type : Number,
        default : 0
    }
})
module.exports = mongoose.model("bugs",bugSchema);