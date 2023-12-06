// routes.js - Express route definitions

const express = require('express')
const userController = require('../controllers/userController')
const jobController = require('../controllers/jobController')
const companyController = require('../controllers/companyController')
const influencerController = require('../controllers/influencerController')
const notificationController = require('../controllers/notificationController')

const router = express.Router()

// Login endpoint called by LoginPage.js (Handles Login)
router.post("/api/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userController.performLogin(email, password)
        res.status(200).send({message: "User verified.", accountType: user.account_type})
    } catch (error) {
        const {errorMessage, statusCode} = userController.handleLoginError(error)
        return res.status(statusCode).json(errorMessage);
    }
});

// post a job to the database
router.post('/api/postJob', async (req, res) => {
    try {
        const id = 1 // todo need to update this magic number to something real
        const {title, description, location} = req.body;
        await jobController.postJob(id, title, description, location)
        res.status(200).send({message: 'Data added successfully'})
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).send(error);
    }
});

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

router.get("/api/allCompanies", async (req, res) => {
    try {
        const companies = await companyController.allCompanies()
        res.status(200).send(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send(error);
    }
});

router.get("/api/influencers", async (req, res) => {
    try {
        const influencers = await influencerController.allInfluencers()
        res.status(200).send(influencers);
    } catch (error) {
        console.error('Error fetching influencers:', error);
        res.status(500).send(error);
    }
});

// Get all jobs for a specific company

router.get("/api/jobs/:companyId", async (req, res) => {
    const {companyId} = req.params;
    try {
        const companyJobs = await jobController.allCompanyJobs(companyId)
        res.status(200).send(companyJobs)
    } catch (error) {
        const {errorMessage, statusCode} = jobController.handleAllCompanyJobsErrors(error)
        res.status(statusCode).json({message: errorMessage});
    }
});

router.post("/api/sendOffer", async (req, res) => {
    const { influencer_id, job_id, message } = req.body;
    const company_id = 1; // hardcoded for now as per your instruction

    try {
        notificationController.createNotification(company_id, influencer_id, job_id, message)
        res.json({ status: 'success', message: 'Offer sent successfully' });
    } catch (error) {
        console.error('Error sending offer:', error);
        res.status(500).send(error);
    }
});

//Influencer get jobOffers API
router.get("/api/jobOffers/:influencerId", async (req, res) => {
    const { influencerId } = req.params;
    try {
        const jobOffers = await notificationController.getJobOffersForInfluencer(influencerId);
        res.status(200).json(jobOffers);
    } catch (error) {
        console.error('Error fetching job offers:', error);
        res.status(500).send(error);
    }
});

//Influencer AcceptJobOffer API
router.post("/api/acceptJob", async (req, res) => {
    const { influencerId, jobId } = req.body;
    try {
        await jobController.acceptJob(influencerId, jobId);
        res.status(200).json({ message: 'Job accepted successfully' });
    } catch (error) {
        console.error('Error accepting job:', error);
        res.status(500).send(error);
    }
});

 //Influencer RejectJobOffer API
router.post("/api/rejectJobOffer", async (req, res) => {
    const { offerId } = req.body; // offerId is the ID of the job offer (notification)
    try {
        await notificationController.rejectJobOffer(offerId);
        res.status(200).json({ message: 'Job offer rejected successfully' });
    } catch (error) {
        console.error('Error rejecting job offer:', error);
        res.status(500).send(error);
    }
});


// Endpoint to handle user registration
router.post('/api/register', async (req, res) => {
    try {
        const accountInfo = req.body;
        const user = await userController.performRegister(accountInfo);
        res.status(201).send({message: "User created successfully", id: user.id, accountType: user.account_type });
    } catch (error) {
        console.log(error);
        const { errorMessage, statusCode } = userController.handleAccountSignupError(error);
        return res.status(statusCode).json(errorMessage);
    }
});

module.exports = router;