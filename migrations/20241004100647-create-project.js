'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product', {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product');
  }
};