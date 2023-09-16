// Import the express library
const express = require('express');

// Initialize the express application
const app = express();

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

