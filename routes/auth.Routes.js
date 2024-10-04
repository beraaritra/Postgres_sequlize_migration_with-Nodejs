const express = require("express");

const { signup, login } = require('../controller/authController.js')

const router = express.Router();

// Signup Routes
router.post("/signup", signup);

// Login Routes
router.post("/login", login);

module.exports = router;