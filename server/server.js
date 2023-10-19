// Import the express library
const express = require('express');
const {Client} = require("pg");
const cors = require('cors');
// Use CORS middleware and allow any domain to access your API


// Initialize the express application
const app = express();
app.use(cors());

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
// app.use(express.static('client/build'));

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

