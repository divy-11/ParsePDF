const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_TOKEN = process.env.TOKEN_AUTH;

const authUser = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({ Unauthorized: "No token provided" });
    } else {
        const token = authorization.split(' ')[1];
        // console.log(token);
        try {
            const decoded = jwt.verify(token, JWT_TOKEN);
            req.user = decoded;
            next();
        } catch (error) {
            console.error("JWT verification error:", error.message);
            return res.status(403).json({ message: "Invalid token" });
        }
    }
}

module.exports = authUser;
