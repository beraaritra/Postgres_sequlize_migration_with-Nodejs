const productModel = require('../models/product.js')

const createProduct = async (req, res) => {
    const body = req.body;
    const userId = req.user.id;

    try {
        const newProduct = await productModel.create({
            title: body.title,
            isFeatured: body.isFeatured,
            productImage: body.productImage,
            price: body.price,
            shortDescription: body.shortDescription,
            description: body.description,
            productUrl: body.productUrl,
            catagory: body.catagory,
            tags: body.tags,
            createdBy: userId,
        });
        res.status(201).json({ sucess: true, message: "New Product Created successfully", data: newProduct })
        console.log("Product created successfully".bgYellow);

    } catch (error) {
        res.status(500).json({ success: false, message: "Error to create a new product", error: error.message });
        console.log("Error in creating product".bgRed + error.message);
    }
}

const getAllProduct = async (req, res) => {

    const result = await productModel.findAll();
    console.log("All products fetched successfully".bgYellow);
    res.status(200).json({ status: true, message: "All product fetched successfully", data: result })
}

module.exports = { createProduct, getAllProduct };