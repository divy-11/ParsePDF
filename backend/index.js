const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./db");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Following are the routes:")
})


app.listen(6060);
