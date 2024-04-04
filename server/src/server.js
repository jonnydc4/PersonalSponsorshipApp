const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const {loadTestData} = require("./utils/util");
const {getAllInfluencers} = require("./models/model");

// Use CORS middleware and allow any domain to access your API

// Initialize the express application
const app = express();
app.use(cors());
app.use(express.json());

// Use the static frontend build and define our routes.
app.use(express.static('build'));
app.use(routes);

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

// Load test data

loadTestData()
    .then(() => console.log('Test data is loaded and ready.'))
    .catch(error => console.error('Error loading test data:', error));

process.on('exit', () => {
    console.log("Closing db pool");
    dbPool.end();
})
