const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const bugsroute = require("./routes/bugsroute");
const featureroute = require("./routes/featureroute");
const userroute = require("./routes/userroute");
const downloadsroute  = require("./routes/downloadsroute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const txroute = require("./routes/txroute");
const clientroute = require("./routes/clientroute");
dotenv.config({path:"../.env"});
const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));

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

app.use("/",userroute);
app.use("/bugs",bugsroute);
app.use("/features",featureroute);
app.use("/txhistory",txroute);
app.use("/downloadhistory",downloadsroute);
app.use("/getclient",clientroute);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("<strong>This is the API we use!!!<strong>");
});