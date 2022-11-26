/**
 * @file файл с роутами /upload
 */
const express = require("express")
const router = express.Router()
const { uploadFile } = require("../controllers/upload")

router.route("/").put(uploadFile)

module.exports = router
