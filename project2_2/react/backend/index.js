const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bugsroute = require("./routes/bugsroute");
const featureroute = require("./routes/featureroute");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
let mongooseconnect = async ()=>{
    try{
        await mongoose.connect(process.env.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Successfully connected to mongo");
    }
    catch(error){
        console.log(error);
    }
}
app.listen(8800,()=>{
    mongooseconnect();
    console.log("This is an API");
})
app.use("/bugs",bugsroute);
app.use("/features",featureroute);
app.get('/', (req, res) => {
    res.send("<strong>This is the API we use!!!<strong>");
});