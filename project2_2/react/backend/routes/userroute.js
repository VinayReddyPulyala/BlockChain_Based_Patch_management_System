const User = require("../models/UserModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const { parse } = require('cookie');
dotenv.config();

const router = express.Router();

const createToken = (id) => {
    let token = jwt.sign({ id }, process.env.tokensignature);
    return token;
}

let handleerror = (err) => {
    let error = { username: "", password: "" };
    if (err.code == 11000) {
        error.username = "Username Already Exists";
        return error;
    }
    if (err.message.includes("users validation failed")) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message;
        });
    }
    return error;
}


router.post("/register", async (req, res) => {
    let { username, password } = req.body;
    try {
        if (username.length == 0) {
            res.json({
                error: {
                    username: "Username is required"
                }
            })
            return;
        }
        else if (password.length == 0) {
            res.json({
                error: {
                    password: "Password is required"
                }
            })
            return;
        }
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        let user = await User.create({ username, password });
        let token = createToken(user._id);
        res.cookie('jwt', token, {
            withCredentials: true,
            httpOnly: false,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        })
        res.status(200).json({ created: true });
    } catch (err) {
        let error = handleerror(err);
        res.json({ error, created: false });
    }
})
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username: username });
        if (user) {
            let verify = await bcrypt.compare(password, user.password);
            if (verify) {

                res.cookie("jwt", createToken(user._id), {
                    withCredentials: true,
                    httpOnly: false,
                    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                })
                res.status(200).json({ credentials: true, role: user.role });
            }
            else {
                res.json({ "error": "Invalid Password" });
            }
        }
        else {
            res.json({ "error": "User Not Found" });
        }

    } catch (err) {
        res.status(401).json({ "message": err });
    }
})

router.post("/", async (req, res) => {
    try {
        if (req.headers.cookie) {
            let token = parse(req.headers.cookie);
            if (token.jwt) {

                let { id } = jwt.verify(token.jwt, process.env.tokensignature);

                let user = await User.findById(id);
                if (user) {
                    if (user.role !== req.body.role) {
                        res.json({ role_error: "cookie mismatch" });
                        return;
                    }
                    res.status(200).json({ message: "cookie matched", "user": user.username});
                    return;
                }
                else {
                    res.json({ error: "cookie mismatch" });
                    return;
                }

            }
            else {
                res.json({ error: "cookie Not Found" });
                return;
            }
        }
        else {
            res.json({ error: "No cookie Found" });
            return;
        }
    } catch (err) {
        res.status(401).json({ error: "Internal Server Error" });
        return;
    }
})

router.post("/logout", async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.send("ok");
    } catch (err) {
        res.status(401).json({ error: "Internal Server Error" });
    }
})

router.get("/initlog",async (req,res)=>{
    try{
        if(req.headers.cookie){
            let token = parse(req.headers.cookie);
            if (token.jwt) {
                let { id } = jwt.verify(token.jwt, process.env.tokensignature);
                let user = await User.findById(id);
                if (user) {
                    res.status(200).json({role:user.role});
                    return ;
                }
                else {
                    res.json({ error: "cookie mismatch" });
                    return ;
                }

            }
            else {
                res.json({ error: "cookie Not Found" });
                return;
            }
        }
        else{
            res.json({ error: "cookie Not Found" });
            return;
        }
    }catch(err){
        console.log(err);
        res.status(400).json({error:"Internal Servor error"});
        return ;
    }
})
module.exports = router;