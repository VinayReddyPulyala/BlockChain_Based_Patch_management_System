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

router.post("/", async (req, res) => {
    try {
        await featuremodel.insertMany(req.body);
        res.status(200).send("Successfully Uploaded");
    }
    catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;

