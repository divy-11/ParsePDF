require('dotenv').config();
const express = require("express");
const app = express.Router()
const { User } = require("../db")
const jwt = require("jsonwebtoken");
const authUser = require('./middleware');
const JWT_TOKEN = process.env.TOKEN_AUTH;
const COOKIE_OPTIONS = { httpOnly: true, secure: true, sameSite: "None" };

app.post("/signup", async (req, res) => {
    const username = req.body.name
    const email = req.body.email
    const password = req.body.password

    const sameUser = await User.findOne({ email });

    if (sameUser) {
        return res.status(400).json({ message: "User already Exists." });
    }
    try {
        const userCreated = await User.create({
            name: username,
            email,
            password
        });

        const token = jwt.sign({ userId: userCreated._id }, JWT_TOKEN);
        
        res.status(200).json({
            message: "User Created !",
            userId: userCreated._id,
            token: 'Bearer ' + token
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCheck = await User.findOne({ email, password });

        if (!userCheck) {
            return res.status(401).json({ message: "Invalid Creds" });
        }

        const token = jwt.sign({ userId: userCheck._id }, JWT_TOKEN);
        
        res.status(200).json({
            token,
            userId: userCheck._id,
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get("/", authUser, async (req, res) => {

    try {
        if (!req.user.userId) {
            return res.status(401).json({ message: "Please login first." });
        }
        const userId = req.user.userId;
        // console.log("Hit Huaaaa");
        const user = await User.findById(userId);
        res.status(200).json({ name: user.name, email: user.email, _id: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.put("/", authUser, async (req, res) => {
    try {
        if (!req.user.userId) {
            return res.status(401).json({ message: "Please login first." });
        }
        const { curPass, ...updateData } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user.password !== curPass) {
            return res.status(400).json({ error: "Provide your old password carefully!!" });
        }
        await User.updateOne({ _id: req.user.userId }, updateData);
        res.status(200).json({ message: "Updated successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error while updating information" });
    }
});

module.exports = app;