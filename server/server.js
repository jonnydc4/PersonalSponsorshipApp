// Import the express library
const express = require('express');
// const {Client} = require("pg");
const cors = require('cors');
const bodyParser = require('body-parser'); //npm install body-parser
const {Pool} = require("pg");
const userController = require('./userController')
const routes = require('./routes');
// Use CORS middleware and allow any domain to access your API

// test comment

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


// This makes our "/" endpoint render our react app
app.use(express.static('client/build'));
app.use(routes);


// post a job to the database
app.post('/postJob', async (req, res) => {

    const {title, description, location} = req.body;
    try {
        const client = await dbPool.connect();
        // Construct SQL query
        const company_id = 1; // temporary value for testing. Replace with actual company id later.
        const query = `
            INSERT INTO jobs (company_id, title, description, location)
            VALUES ($1, $2, $3, $4)
        `;

        // Execute SQL query
        const result = await client.query(query, [company_id, title, description, location]);
        client.release();
        // Send a success response back to the client
        res.json({status: 'success', message: 'Data added successfully'});
    } catch (err) {
        console.log(err);
        console.error('Database error when executing jobPost:', err.stack);
        res.status(500).json({status: 'error', message: err.message});
    }

});

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

// Get all jobs for a specific company
app.get("/jobs/:companyId", async (req, res) => {
    const { companyId } = req.params;

    // Validate the companyId, for example, check if it's a number
    if (!companyId || isNaN(parseInt(companyId, 10))) {
        return res.status(400).json({ status: 'error', message: 'Invalid company ID' });
    }

    const client = await dbPool.connect();
    try {
        const query = "SELECT * FROM public.jobs WHERE company_id = $1";
        const queryResults = await client.query(query, [companyId]);
        res.json(queryResults.rows);
    } catch (err) {
        console.error(`Error fetching jobs for company ${companyId}:`, err);
        res.status(500).json({ status: 'error', message: 'An error occurred while fetching jobs' });
    } finally {
        client.release();
    }
});

app.get("/allCompanies", async (req, res) => {
    const client = await dbPool.connect();
    try {
            const queryResults = await client.query("SELECT * FROM public.companies");
            res.json(queryResults.rows);
        }
        catch (err) {
            console.error('Error fetching companies:', err);
            res.status(500).send(err);
        }
        finally {
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


// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

process.on('exit', () => {
    console.log("Closing db pool");
    dbPool.end();
})
