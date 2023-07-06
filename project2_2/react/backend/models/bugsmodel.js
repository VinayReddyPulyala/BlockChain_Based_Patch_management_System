const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
    software :{
        type : String,
        required : true,
    },
    bugdesc : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("bugs",bugSchema);