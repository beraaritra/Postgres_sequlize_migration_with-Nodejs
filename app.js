const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.Routes');

const app = express();

dotenv.config();
PORT = process.env.PORT || 5000;

// Test routes
app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: 'REST API are working' });
});

// All Routes will be here
app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`.bgBlue);
})