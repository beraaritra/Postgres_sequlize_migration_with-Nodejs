const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

const swaggerUI = require('swagger-ui-express');
const yaml = require('yamljs');

const authRouter = require('./routes/auth.Routes');
const productRoutes = require('./routes/product.Routes');

const app = express();

dotenv.config();

PORT = process.env.PORT || 5000;


app.use(express.json()); 
 
// Test routes 
app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: 'REST API are working' });
});

// Auth user routes 
app.use('/api/v1/auth', authRouter) 

// Product Routes
app.use('/api/v1/product', productRoutes)


// Load Swagger YAML file
const swaggerDocument = yaml.load('./swagger.yaml');

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`.bgBlue);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`.bgMagenta);
})