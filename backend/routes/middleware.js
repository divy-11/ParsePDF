const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_TOKEN = process.env.TOKEN_AUTH;

const authUser = (req, res, next) => {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
        // console.log("Unauthorized: No token provided");
        return res.status(401).json({Unauthorized: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, JWT_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = authUser;
