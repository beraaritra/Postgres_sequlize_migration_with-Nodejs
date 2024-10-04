const express = require("express");

const { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct } = require('../controller/productController.js');

const { authentications, restricTo } = require("../controller/authController.js");

const router = express.Router();

router.post("/create", authentications, restricTo('1'), createProduct);

router.get("/get-product", authentications, getAllProduct)

router.get("/get-product/:id", authentications, getProductById)

router.patch("/product-update/:id", authentications, restricTo('1'), updateProduct)

router.delete("/product-delete/:id", authentications, restricTo('1'), deleteProduct)

module.exports = router;