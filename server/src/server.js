const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
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

process.on('exit', () => {
    console.log("Closing db pool");
    dbPool.end();
})

const db = require('./database/mongo-db');

db.start('mongodb://localhost:27018/nfluencr', (database) => {
    console.log('Connected to Database');

    // Set up your express server, routes, etc.
    const express = require('express');
    const app = express();


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// Additional application logic
