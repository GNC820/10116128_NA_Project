const Finance = require('../models/finance');

// Get all finance records
const getAllFinances = async (req, res) => {
  try {
    const finances = await Finance.findAll();
    res.json(finances);
  } catch (error) {
    console.error("Error getting finance records:", error);
    res.status(500).json({ message: "Failed to retrieve finance records" });
  }
};

// Add a new finance record
const addFinanceRecord = async (req, res) => {
  const { startDate, endDate, amount } = req.body;
  try {
    const newFinance = await Finance.create({ startDate, endDate, amount });
    res.status(201).json(newFinance);
  } catch (error) {
    console.error("Error adding finance record:", error);
    res.status(500).json({ message: "Failed to add finance record" });
  }
};

module.exports = {
  getAllFinances,
  addFinanceRecord,
};
