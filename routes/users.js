const express = require("express")
const router = express.Router()
const { protect } = require("../middlewares/auth")
const { registerUser, loginUser, updateUser } = require("../controllers/users")

router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/update", protect, updateUser)

module.exports = router
