// Import the express library
const express = require('express');
const {Client} = require("pg");

// Initialize the express application
const app = express();

// Create a connection to the database
const dbClient = new Client({
    password: "root",
    user: "root",
    host: "postgres",
});

// This makes our "/" endpoint render our react app
app.use(express.static('client/build'));

app.get("/allJobs"), async (req, res) => {
    const queryResults = await dbClient
        .query("Select * From jobs")
        .then((payload) => {
            return payload.rows;
        })
        .catch(() => {
            throw new Error("Query failed");
        });
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(queryResults));
}

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

