const express = require("express");
const { Sequelize } = require('sequelize');
const sequelize = require('./config/database'); // Import Sequelize instance
const { initializeInventory } = require('./initialize');

const cors = require("cors");

const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 8080;

const app = express();


app.use(cors());


// Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

sequelize.sync({alter: true})
  .then(async() => {
    console.log('Database synchronized successfully.');
    // initialize the invenory
    //await initializeInventory();
    // Start the server after syncing the database
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });