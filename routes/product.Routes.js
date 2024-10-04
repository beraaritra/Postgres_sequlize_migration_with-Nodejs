const express = require("express");

const { createProduct } = require('../controller/productController.js');
const { authentications, restricTo } = require("../controller/authController.js");

const router = express.Router();

router.post("/create", authentications, restricTo('1'), createProduct);
console.log("createProduct:", createProduct);
console.log("authentications:", authentications);
console.log("restricTo:", restricTo);

module.exports = router;