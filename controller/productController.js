
const productModel = require('../models/product.js');
const userModel = require('../models/user.js');

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
            category: body.category,
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

// Get all products
const getAllProduct = async (req, res) => {

    const result = await productModel.findAll({ include: userModel });
    console.log("All products fetched successfully".bgYellow);
    res.status(200).json({ status: true, message: "All product fetched successfully", data: result })
}

// Get product by id
const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        // Fetch the product by ID along with its associated user data
        const result = await productModel.findByPk(productId, { include: userModel });

        // If no product found, return a 404 error
        if (!result) {
            console.log("Invalid product ID".bgRed);
            return res.status(404).json({ status: false, message: "Invalid product ID" });
        }

        // If product is found, send the result
        console.log("Product fetched successfully".bgYellow);
        return res.status(200).json({ status: true, message: "Product fetched successfully", data: result });
    } catch (error) {
        // Catch any unexpected errors and return a 500 response
        console.error("Error fetching product: ".bgRed, error.message);
        return res.status(500).json({ status: false, message: "Internal server error", error: error.message });
    }
};

// update the product
const updateProduct = async (req, res, next) => {
    const productId = req.params.id;
    const body = req.body;

    try {
        // Find the product by ID
        const product = await productModel.findByPk(productId);

        if (!product) {
            console.log("Invalid product ID".bgRed);
            return res.status(404).json({ status: false, message: "Invalid product ID" });
        }

        // Update product fields with new values from the request body
        product.title = body.title;
        product.isFeatured = body.isFeatured;
        product.productImage = body.productImage;
        product.price = body.price;
        product.shortDescription = body.shortDescription;
        product.description = body.description;
        product.productUrl = body.productUrl;
        product.category = body.category;
        product.tags = body.tags;

        // Save the updated product
        const updatedProduct = await product.save();

        console.log("Product updated successfully".bgYellow);
        return res.status(200).json({ status: true, data: updatedProduct });

    } catch (error) {
        console.log('Error updating the product'.bgRed, error.message);
        return res.status(500).json({ status: false, message: "Error updating product: " + error.message });
    }
};

// Delete the product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        // Check if the product exists
        const product = await productModel.findByPk(productId);

        if (!product) {
            console.log("Invalid product ID".bgRed);
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        // Delete the product
        await product.destroy();
        console.log("Product deleted successfully".bgYellow);
        return res.status(200).json({ status: true, message: "Product deleted successfully" });

    } catch (error) {
        console.log('Error deleting the product'.bgRed, error);
        return res.status(500).json({ status: false, message: "Failed to delete product", error: error.message });
    }
};



module.exports = { createProduct, getAllProduct, getProductById, updateProduct, deleteProduct };