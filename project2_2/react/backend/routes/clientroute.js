const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();


router.get("/",async (req,res)=>{
    try{
        let apikey = process.env.web3token;
        res.json({apikey});
    }catch(err){
        res.status(400).json({error:"Internal Server Error"});
    }
})
module.exports = router;