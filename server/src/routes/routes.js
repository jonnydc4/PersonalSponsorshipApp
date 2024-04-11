// <--------------- routes.js contains all the routes for the server. --------------->
// Incoporating the [MVC] design pattern, the routes.js file is responsible for handling the requests 
// from the client and sending the appropriate responses.

const express = require('express')
const userController = require('../controllers/userController')
const jobController = require('../controllers/jobController')
const companyController = require('../controllers/companyController')
const influencerController = require('../controllers/influencerController')
const notificationController = require('../controllers/notificationController')
const {locals} = require("express/lib/application");
const {getInfluencerById, getCompanyById} = require("../database/database");

const router = express.Router()

// Endpoint that services LoginPage.js - Used to handle the user login
// For further details, see userController.js
router.post("/api/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userController.performLogin(email, password)
        res.status(200).send({message: "User verified.", userId: user.id, accountType: user.account_type})
    } catch (error) {
        const {errorMessage, statusCode} = userController.handleLoginError(error)
        return res.status(statusCode).json(errorMessage);
    }
});

// Endpoint that serves to post a job to the database
// For further details, see jobController.js
router.post('/api/postJob', async (req, res) => {
    try {
        // todo need to update this magic number to something real
        const {title, description, location, companyId} = req.body;
        await jobController.postJob(companyId, title, description, location)
        res.status(200).send({message: 'Data added successfully'})
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).send(error);
    }
});

// Endpoint that fetches all available jobs from the database.
// For further details, see jobController.js
router.get("/api/allJobs", async (req, res) => {
    // const client = await dbPool.connect();
    try {
        const jobs = await jobController.allJobs()
        // console.log(result)
        res.status(200).send(jobs)
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send(error);
    }
});

// Endpoint that fetches all companies currently created within the database.
// For further details, see companyController.js
router.get("/api/allCompanies", async (req, res) => {
    try {
        const companies = await companyController.allCompanies()
        res.status(200).send(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send(error);
    }
});

// Endpoint that fetches all influencers currently created within the database.
// For further details, see influencerController.js
router.get("/api/influencers", async (req, res) => {
    try {
        const influencers = await influencerController.allInfluencers()
        res.status(200).send(influencers);
    } catch (error) {
        console.error('Error fetching influencers:', error);
        res.status(500).send(error);
    }
});


// Endpoint that fetches all jobs posted from a certain company (provided an actual companyID is provided that matches within database).
// For further details, see jobController.js
router.get("/api/jobs/:companyId", async (req, res) => {
    const {companyId} = req.params;
    try {
        const companyJobs = await jobController.allCompanyJobs(companyId)
        console.log(companyJobs)
        res.status(200).send(companyJobs)
    } catch (error) {
        const {errorMessage, statusCode} = jobController.handleAllCompanyJobsErrors(error)
        res.status(statusCode).json({message: errorMessage});
    }
});

//Test that the company id is working JONAH
router.post("/api/sendOffer", async (req, res) => {
    const {influencer_id, job_id, message, company_id} = req.body;
    try {
        await notificationController.createNotification(company_id, influencer_id, job_id, message)
        res.json({status: 'success', message: 'Offer sent successfully'});
    } catch (error) {
        console.error('Error sending offer:', error);
        res.status(500).send(error);
    }
});

//Influencer get jobOffers API
// Endpoint that fetches all jobs offers currently sent to a certain influencer (providing influencerID matches actual influencer in database).
// For further details, see notificationController.js
router.get("/api/jobOffers/:influencerId", async (req, res) => {
    const {influencerId} = req.params;
    try {
        const jobOffers = await notificationController.getJobOffersForInfluencer(influencerId);
        res.status(200).json(jobOffers);
    } catch (error) {
        console.error('Error fetching job offers:', error);
        res.status(500).send(error);
    }
});

//Influencer AcceptJobOffer API
// Endpoint that updates database when influencer has accepted a job offer from a company.
// For further details, see jobController.js
router.post("/api/acceptJob", async (req, res) => {
    const {influencerId, jobId} = req.body;
    try {
        await jobController.acceptJob(influencerId, jobId);
        res.status(200).json({message: 'Job accepted successfully'});
    } catch (error) {
        console.error('Error accepting job:', error);
        res.status(500).send(error);
    }
});

//Influencer RejectJobOffer API
// Endpoint that updates database when influencer has rejected a job offer from a company.
// For further details, see notificationController.js
router.post("/api/rejectJobOffer", async (req, res) => {
    const {offerId} = req.body; // offerId is the ID of the job offer (notification)
    try {
        await notificationController.rejectJobOffer(offerId);
        res.status(200).json({message: 'Job offer rejected successfully'});
    } catch (error) {
        console.error('Error rejecting job offer:', error); // console statement signifying error rejecting offer
        res.status(500).send(error);
    }
});


// Endpoint to handle user registration
// Endpoint that handles registering users to the database.  For further details, see userController.js
router.post('/api/register', async (req, res) => {
    try {
        const accountInfo = req.body;
        const user = await userController.performRegister(accountInfo);
        res.status(201).send({message: "User created successfully", id: user.id, accountType: user.account_type});
    } catch (error) {
        console.log(error);
        const {errorMessage, statusCode} = userController.handleAccountSignupError(error);
        return res.status(statusCode).json(errorMessage);
    }
});

router.get('/api/getInfluencerByID', async (req, res) => {
    const userID = req.query.id; // id is the ID of the user
    try {
        const influencer = await getInfluencerById(userID)
        const company = await getCompanyById(userID)
        if (influencer !== null) {
            console.log(influencer)
            res.send({userType: "influencer", userData: influencer})
        } else if (company !== null) {
            console.log(company)
            res.send({userType: "company", userData: company})
        } else {
            console.log("User doesn't exist")
            res.send({userType: null, userData: null})
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;