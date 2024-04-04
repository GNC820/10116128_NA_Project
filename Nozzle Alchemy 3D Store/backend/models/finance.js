
const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

// Define the Finance model
const Finance = sequelize.define('Finance', {
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Finance;