const Downloadsmodel = require("../models/Downdhstry");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const userdwnd = await Downloadsmodel.create(req.body);
        console.log(userdwnd);
        res.status(200).json({ message: "Successfull" });
    } catch (err) {
        res.json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        let downloads = await Downloadsmodel.find();
        let users = new Set(downloads.map((val)=>{
            return val.username;
        }));
        let obj = {};
        for(let i of users){
            obj[i] = await Downloadsmodel.find({username:i});
        }
        res.status(200).json(obj);
    } catch (err) {
        console.log(err);
        res.json({ error: "Internal Server Error" });
    }
});
router.get("/del",async (req,res)=>{
    try{
        await Downloadsmodel.deleteMany();
        res.send("ok");
    }
    catch(err){
        res.json({ error: "Internal Server Error" });
    }
})

router.get("/userdwndpatches", async (req, res) => {
    try {
        let data = await Downloadsmodel.find(req.query);
        res.status(200).json(data);
    } catch (err) {
        res.json({ error: "Internal Server Error" });
    }
})
module.exports = router;