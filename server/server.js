// Import the express library
const express = require('express');
const {Client} = require("pg");
const cors = require('cors');
const bodyParser = require('body-parser'); //npm install body-parser
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
app.use(express.static('client/build'));

// This line to use express.json middleware for the login page
app.use(express.json());

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

//Endpoint to verify the Company email at login
app.post("/verifyEmail", async (req, res) => {
    const { email } = req.body;

    // Check if the email is provided in the request
    if (!email) {
        return res.status(400).send({ message: "Email is required" });
    }

    try {
        // Query the database to check if the provided email exists in the 'companies' table
        const queryResults = await dbClient.query("SELECT * FROM public.companies WHERE email = $1", [email]);

        if (queryResults.rows.length > 0) {
            res.status(200).send({ message: "Email verified", isValid: true });
        } else {
            res.status(200).send({ message: "Email not found", isValid: false });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

