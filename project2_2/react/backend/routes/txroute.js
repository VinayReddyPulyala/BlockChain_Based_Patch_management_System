const express = require("express");
const mongoose = require("mongoose");
const TxhistoryModel = require("../models/TxhistoryModel");
const User = require("../models/UserModel");
const { parse } = require('cookie');
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/uploadtx", async (req, res) => {
    const { tx, desc, role, status } = req.body;
    console.log(role);
    try {
        let check = await TxhistoryModel.find({ role });
        let new_tx;
        console.log(check);
        if (check.length) {
            new_tx = await TxhistoryModel.findOneAndUpdate({ role }, {
                $push: {
                    history: {
                        txid: tx,
                        description: desc,
                        status: status,
                        date : new Date()
                    }
                }
            }, { new: true });
        }
        else {
            try {
                new_tx = await TxhistoryModel.create({
                    role: role,
                    history: [
                        {
                            txid: tx,
                            description: desc,
                            status: status,
                            date : new Date()
                        }
                    ]
                })
                console.log(new_tx);
            } catch (err) {
                return res.status(500).json({ "message": "Error in creating record" })
            }
        }
        return res.status(200).send("ok");
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: "Internal Server Error" });
    }
});

router.get("/", async (req, res) => {
    try {
        let token = parse(req.headers.cookie);
        let { id } = jwt.verify(token.jwt, process.env.tokensignature);
        let user = await User.findById(id);
        let transactions = await TxhistoryModel.find({ role: user.role });
        console.log(transactions);
        res.status(200).json(transactions[0]);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: "Internal Server Error" });
    }
})
module.exports = router;