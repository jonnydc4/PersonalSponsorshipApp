// Import the express library
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); //npm install body-parser
const {Pool} = require("pg");
const routes = require('./routes/routes');
// Use CORS middleware and allow any domain to access your API

// Initialize the express application
const app = express();
app.use(cors());
app.use(express.json());

// Create a connection to the database
const dbPool = new Pool({
    password: "root",
    user: "root",
    host: "postgres",
});

// Use the static frontend build and define our routes.
app.use(express.static('build'));
app.use(routes);

/* Start of things to be refactored into other files */
app.get("/allJobs", async (req, res) => {
    const client = await dbPool.connect();
    try {
        const queryResults = await client.query("SELECT * FROM public.jobs");
        res.json(queryResults.rows);
    } catch (err) {
        console.error('Error fetching jobs:', err);
        res.status(500).send(err);
    } finally {
        client.release();
    }
});

//Endpoint to verify the Company email at login
app.post("/verifyEmail", async (req, res) => {
    const client = await dbPool.connect();
    const {email} = req.body;

    // Check if the email is provided in the request
    if (!email) {
        return res.status(400).send({message: "Email is required"});
    }

    try {
        // Query the database to check if the provided email exists in the 'companies' table
        const queryResults = await client.query("SELECT * FROM public.companies WHERE email = $1", [email]);

        if (queryResults.rows.length > 0) {
            res.status(200).send({message: "Email verified", isValid: true});
        } else {
            res.status(200).send({message: "Email not found", isValid: false});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// Endpoint to get all influencers
app.get("/influencers", async (req, res) => {
    const client = await dbPool.connect();
    try {
        const queryResults = await client.query("SELECT id, name, email FROM public.influencers");
        res.json(queryResults.rows);
    } catch (err) {
        console.error('Error fetching influencers:', err);
        res.status(500).send(err);
    } finally {
        client.release();
    }
});


// Endpoint to send a job offer
app.post("/sendOffer", async (req, res) => {
    const client = await dbPool.connect();
    const { influencer_id, job_id, message } = req.body;
    const company_id = 1; // hardcoded for now as per your instruction

    try {
        const query = `
            INSERT INTO notifications (company_id, influencer_id, job_id, message)
            VALUES ($1, $2, $3, $4)
        `;
        await client.query(query, [company_id, influencer_id, job_id, message]);
        res.json({ status: 'success', message: 'Offer sent successfully' });
    } catch (err) {
        console.error('Error sending offer:', err);
        res.status(500).send(err);
    } finally {
        client.release();
    }
});

/* End of things to be refactored into other files */

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

process.on('exit', () => {
    console.log("Closing db pool");
    dbPool.end();
})
