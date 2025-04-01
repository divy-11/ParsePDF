require('dotenv').config();
const express = require("express");
const app = express.Router()
const { User } = require("../db")
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.TOKEN_AUTH;
const COOKIE_OPTIONS = { httpOnly: true, secure: true, sameSite: "strict" };

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
        res.cookie("token", token, COOKIE_OPTIONS);
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

app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userCheck = await User.findOne({ email, password });

        if (!userCheck) {
            return res.status(401).json({ message: "Invalid Creds" });
        }

        const token = jwt.sign({ userID: userCheck._id }, JWT_TOKEN);
        res.cookie("token", token, COOKIE_OPTIONS);
        res.status(200).json({
            token: 'Bearer ' + token,
            userId: userCheck._id,
        });
    } catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

/*Under Work
const updateSchema = z.object({
    password: z.string().optional(),
    lastName: z.string().optional(),
    firstName: z.string().optional()
});

app.put("/", authUser, async (req, res) => {
    const updateSuccess = updateSchema.safeParse(req.body);

    if (updateSuccess.success) {
        await Users.updateOne({ _id: req.userId }, req.body);
        res.status(200).json({ message: "Updated successfully" });
    } else {
        res.status(400).json({ message: "Error while updating information" });
    }
});
*/
module.exports = app;