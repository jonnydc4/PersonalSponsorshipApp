// Import the express library
const express = require('express');

// Initialize the express application
const app = express();

// This makes our "/" endpoint render our react app
app.use(express.static('../client/build'));

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

