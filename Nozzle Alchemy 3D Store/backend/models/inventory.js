const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
    colour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amountLeftInGrams: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

module.exports = Inventory;