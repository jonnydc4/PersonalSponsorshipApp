const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const db = require('./database/mongo-db');

// Initialize the database connection
db.start('mongodb://mongodb:27017/nfluencr', async () => {
    console.log('Connected to Database');

    // Initialize the express application only after DB connection is successful
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.static('build')); // Use the static frontend build
    app.use(routes); // Define your routes

    // Start the server on port 3000 or the environment-defined port
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// process.on('exit', ...) and other additional logic (if necessary)
