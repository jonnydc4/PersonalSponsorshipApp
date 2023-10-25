// Import the express library
const express = require('express');
const {Client} = require("pg");
const cors = require('cors');
// Use CORS middleware and allow any domain to access your API


// Initialize the express application
const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the database
const dbClient = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});

dbClient.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error', err.stack));

// This makes our "/" endpoint render our react app
app.use(express.static('client/build'));

// post a job to the database
app.post('/postJob', async (req, res) => {

    const { title, description, location } = req.body;
    try {
        // Construct SQL query
        const company_id = 1; // temporary value for testing. Replace with actual company id later.
        const query = `
            INSERT INTO jobs (company_id, title, description, location)
            VALUES ($1, $2, $3, $4)
        `;

        // Execute SQL query
        const result = await dbClient.query(query, [company_id, title, description, location]);

        // Send a success response back to the client
        res.json({ status: 'success', message: 'Data added successfully' });
    } catch (err) {
        console.log(err);
        console.error('Database error when executing jobPost:', err.stack);
        res.status(500).json({ status: 'error', message: err.message });
    }

});

app.get("/allJobs", async (req, res) => {
    try {
    const queryResults = await dbClient
        .query("Select * FROM public.jobs")
        .then((payload) => {
            return payload.rows;
        })
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(queryResults));
    }
    catch (err) {
        console.log(err);
        res.status(500);
        res.send(err);
    }
})

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

