const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config');

const sequelize = new Sequelize(config[env]);

const connections = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!'.bgGreen);
    } catch (error) {
        console.error('Unable to connect to the database:'.bgRed, error);
    }
}

connections();

module.exports = sequelize;