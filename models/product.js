const sequelize = require("../db/database");
const { Model, Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = sequelize.define('product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  productImage: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productUrl: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    // allowNull: false,
  },
  catagory: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: { model: 'user', key: 'id' },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE,
  }
}, {
  paranoid: true,
  freezTableName: true,
  tableName: 'product',
  modelName: 'product',
});