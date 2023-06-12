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
        await featuremodel.insertMany(req.body);
        res.status(200).send("Successfully Uploaded");
    }
    catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;