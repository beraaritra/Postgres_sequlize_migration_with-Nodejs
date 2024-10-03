const express = require("express");

const { signup } = ('../controller/authController.js')

const router = express.Router();

router.post("/signup", signup);

module.exports = router;