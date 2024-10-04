const express = require("express");

const { createProduct, getAllProduct } = require('../controller/productController.js');

const { authentications, restricTo } = require("../controller/authController.js");

const router = express.Router();

router.post("/create", authentications, restricTo('1'), createProduct);
router.get("/get-product", getAllProduct)

module.exports = router;