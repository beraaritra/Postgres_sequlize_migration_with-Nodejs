const { sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config');

const sequelize = new sequelize(config[env]);

module.exports = sequelize;