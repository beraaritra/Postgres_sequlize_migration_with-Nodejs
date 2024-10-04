const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

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

app.listen(PORT, () => {
    console.log(`Server started on  http://localhost:${PORT}`.bgBlue);
})