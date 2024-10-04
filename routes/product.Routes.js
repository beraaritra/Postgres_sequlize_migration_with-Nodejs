const express = require("express");

const { createProduct } = require('../controller/productController.js');
const { authentications } = require("../controller/authController.js");

const router = express.Router();

router.post("/create", authentications, createProduct);

module.exports = router;