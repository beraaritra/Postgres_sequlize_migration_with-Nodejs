const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: 'REST API are working' });
});


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`.bgBlue);
})