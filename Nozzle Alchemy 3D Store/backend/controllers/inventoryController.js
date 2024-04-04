const Inventory = require('../models/inventory');


exports.addInventory = async (req, res) => {
  try {
  
    const { colour, amountLeftInGrams, notes } = req.body;

    const inventory = await Inventory.create({
      colour,
      amountLeftInGrams,
      notes,
    });

    res.status(201).json({ success: true, data: inventory });
  } catch (error) {
    console.error('Error adding inventory:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


exports.getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findAll();

    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    console.error('Error retrieving inventory:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
exports.replaceInventory = async (req, res) => {
    try {
      // Extract new inventory data from request body
      const newInventory = req.body;
  
      // Remove existing inventory entries
      await Inventory.destroy({ truncate: true });
  
      // Create new inventory entries
      const createdInventory = await Inventory.bulkCreate(newInventory);
  
      res.status(200).json({ success: true, data: createdInventory });
    } catch (error) {
      console.error('Error replacing inventory:', error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };