const mongoose = require("mongoose");

const DownloadsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now() 
    },
    patchname: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("downloads", DownloadsSchema);