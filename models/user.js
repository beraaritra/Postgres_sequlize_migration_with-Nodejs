'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');
const sequelize = require('../db/database');
const bcrypt = require('bcrypt');

module.exports = sequelize.define('user', {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userType: {
    type: Sequelize.ENUM('0', '1', '2')
  },
  fristName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
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
})