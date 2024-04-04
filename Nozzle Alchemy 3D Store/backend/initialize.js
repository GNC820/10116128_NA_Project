const sequelize = require('./config/database');
const Inventory = require('./models/inventory');

const initialInventory = [
  { colour: 'Pink', amountLeftInGrams: 250, notes: '1' },
  { colour: 'Black', amountLeftInGrams: 450, notes: '1' },
  { colour: 'White', amountLeftInGrams: 1600, notes: '2' },
  { colour: 'Light Green', amountLeftInGrams: 2200, notes: '3' },
  { colour: 'Orange', amountLeftInGrams: 950, notes: '1' },
  { colour: 'Red', amountLeftInGrams: 1500, notes: '2' },
  { colour: 'Blue', amountLeftInGrams: 600, notes: '1' },
  { colour: 'Army Green', amountLeftInGrams: 800, notes: '1' },
  { colour: 'Yellow', amountLeftInGrams: 800, notes: '1' },
  { colour: 'Beige', amountLeftInGrams: 840, notes: '1' },
  { colour: 'Gray', amountLeftInGrams: 0, notes: '1' },
  { colour: 'Purple', amountLeftInGrams: 0, notes: '1' },
];

// Define the initialization function
async function initializeInventory() {
  try {
    // Synchronize the model with the database
    await Inventory.sync({ force: true }); // This will drop the table if it already exists
    console.log('Inventory table created successfully.');

    // Insert initial inventory data into the database
    await Inventory.bulkCreate(initialInventory);
    console.log('Initial inventory data inserted successfully.');
  } catch (error) {
    console.error('Error initializing inventory:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
  }
}

// Call the initialization function

module.exports = { initializeInventory };