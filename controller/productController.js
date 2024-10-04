const productModel = require('../models/product.js')

const createProduct = async (req, res) => {
    const body = req.body;

    try {
        const newProduct = await productModel.create({
            titlle: body.title,
            isFeatured: body.isFeatured,
            projectImage: body.projectImage,
            price: body.price,
            shortDescription: body.shortDescription,
            description: body.description,
            productUrl: body.productUrl,
            catagory: body.catagory,
            tags: body.tags,
            createdBy: 1,
        });
        res.status(2001).json({ sucess: true, message: "New Product Created successfully" })
        console.log("Product created successfully".bgYellow);

    } catch (error) {
        res.status(500).json({ sucess: false, message: "Error to create a new product", data: newProduct });
    }
}

module.exports = createProduct;