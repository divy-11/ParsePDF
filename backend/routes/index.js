const expess = require("express");
const router = expess.Router();
const userRoute = require("./user");
const convRoute = require("./conversion")

router.use("/user", userRoute)
router.use("/conversion", convRoute)

module.exports = router