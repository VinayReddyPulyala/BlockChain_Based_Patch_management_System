const express = require("express");
const mongoose = require("mongoose");
const featuremodel = require("../models/featuresmodel");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const features = await featuremodel.find({ software: req.query.software });
        res.status(200).json(features);
    }
    catch (error) {
        res.status(400).json({ message: "Error" });
    }
});

router.post("/", async (req, res) => {
    try {
        let features = [];
        for(let i of req.body.features){
            features.push({
                "software" : req.body.software,
                "featuredescription" : i
            });
        }
        await featuremodel.insertMany(features);
        res.status(200).send("Successfully Uploaded");
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;