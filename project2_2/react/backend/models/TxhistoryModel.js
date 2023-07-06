const mongoose = require("mongoose");

const TxhistoryModel = new mongoose.Schema({
    role :{
        type : String,
        required:true
    },
    history : [
        {
            date : {
                type : Date,
                default :Date.now()
            },
            txid : {
                type: String,
                required : true,
                unique : true
            },
            description : {
                type : String,
                required : true
            },
            status:{
                type : String,
                required : true
            }
        }
    ]
});

module.exports = new mongoose.model("transactions",TxhistoryModel);