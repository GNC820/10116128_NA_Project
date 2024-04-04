const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// Define the model
const Portofolio = sequelize.define("Portofolio", {
  image: {
    type: DataTypes.TEXT, // Assuming image is stored as base64 string
    allowNull: false,
  },
  addedBy: {
    type: DataTypes.STRING, // You can change the data type as per your requirement
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Export the model
module.exports = Portofolio;
