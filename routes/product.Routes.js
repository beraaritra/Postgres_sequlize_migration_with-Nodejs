const express = require("express");

const { createProduct } = require('../controller/productController.js');

const router = express.Router();

router.post("/create", createProduct);

module.exports = router;