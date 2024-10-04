const sequelize = require("../db/database");
const { Model, Sequelize } = require('sequelize');

module.exports = sequelize.define('product', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  titile: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isFeatured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  projectImage: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  shortDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  productUrl: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    // allowNull: false,
  },
  catagory: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: { model: 'user', key: 'id' },
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
    type: Sequelize.DATE,
  }
}, {
  paranoid: true,
  freezTableName: true,
  tableName: 'product',
  modelName: 'product',
});