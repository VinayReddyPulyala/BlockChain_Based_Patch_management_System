const express = require("express");
const mongoose = require("mongoose");
const bugsmodel = require("../models/bugsmodel");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const bugs = await bugsmodel.find({ software: req.query.software });
        res.status(200).json(bugs);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});


router.get("/gf", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    try {
        console.log(req.cookies);
        const bugs = await bugsmodel.find();
        res.status(200).json(bugs);
    }
    catch (error) {
        res.status(400).json({ message: error });
    }
});

router.post("/", async (req, res) => {
    try {
        let bugs = [];
        for(let i of req.body.bugs){
            bugs.push({
                "software" : req.body.software,
                "bugdesc" : i
            });
        }
        await bugsmodel.insertMany(bugs);
        res.status(200).send("Successfully Uploaded");
    }
    catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;

