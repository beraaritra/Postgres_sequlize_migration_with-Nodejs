'use strict';
const { Model, Sequelize } = require('sequelize');

const sequelize = require('../db/database');
const bcrypt = require('bcrypt');
const product = require('./product');

const user = sequelize.define('user', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM('0', '1', '2'),
    allowNull: false,
  },
  fristName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,

  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  confirmPassword: {
    type: Sequelize.VIRTUAL,
    // Hashes the paassword and store the database
    set(value) {
      if (value === this.password) {
        const hashPassword = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hashPassword);
      } else {
        throw new Error('Passwords do not match');
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  deletedAt: {
    type: Sequelize.DATE
  }
}, {
  paranoid: true,
  freezTableName: true,
  tableName: 'user',
  modelName: 'user',
});

user.hasMany(product, { foreignKey: 'createdBy' })
product.belongsTo(user,{
  foreignKey: 'createdBy',
});
module.exports = user;