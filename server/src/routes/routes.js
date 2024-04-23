// <--------------- routes.js contains all the routes for the server. --------------->
// Incoporating the [MVC] design pattern, the routes.js file is responsible for handling the requests 
// from the client and sending the appropriate responses.

const express = require('express')
const {locals} = require("express/lib/application");
const {
    createNewJob,
    getJobTable,
    getCompanyTable,
    getInfluencerTable,
    getJobsByCompanyId,
    createNewNotification,
    getJobOffersForInfluencer,
    addJobToInfluencer,
    removeNotification,
    createNewInfluencer,
    createNewCompany,
    getInfluencerById,
    getCompanyById,
    createNewMessagesRoom,
    getAllMessagesRoomsForUser
} = require("../database/database");

const router = express.Router()

// ---------------------------------------------------------------------------------------------------------------------
// These are the new routes that use the mongoDB
// ---------------------------------------------------------------------------------------------------------------------
router.get('/api/getUserTypeByID', async (req, res) => {
    const userID = req.query.id; // id is the ID of the user
    try {
        const influencer = await getInfluencerById(userID)
        const company = await getCompanyById(userID)
        if (influencer !== null) {
            res.send({userType: "influencer", userData: influencer})
        } else if (company !== null) {
            res.send({userType: "company", userData: company})
        } else {
            console.log("User doesn't exist")
            res.send({userType: null, userData: null})
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Creates a new influencer in database
router.post('/api/createNewInfluencer', async (req, res) => {
    try {
        const data = req.body;
        await createNewInfluencer(data.userId, data.firstName, data.lastName, data.userName)
        res.status(201).send({message: "New influencer added"});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Creates a new company in database
router.post('/api/createNewCompany', async (req, res) => {
    try {
        const data = req.body;
        await createNewCompany(data.userId, data.companyName, data.address)
        res.status(201).send({message: "New company added"});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint that fetches all available jobs from the database.
router.get("/api/allJobs", async (req, res) => {
    try {
        const jobs = await getJobTable()
        // console.log(result)
        res.status(200).send(jobs)
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
});

router.post('/api/createNewChatRoom', async (req, res) => {
    try {
        const data = req.body;
        await createNewMessagesRoom(data.userId, data.companyId)
        res.status(201).send({message: "New company added"});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint that serves to post a job to the database
router.post('/api/postJob', async (req, res) => {
    try {
        // todo need to update this magic number to something real
        const {title, description, location, companyId} = req.body;
        await createNewJob(companyId, title, description, location)
        res.status(200).send({message: 'Data added successfully'})
    } catch (error) {
        console.error('Error posting job:', error);
        res.status(500).send(error);
    }
});

// Endpoint that fetches all companies currently created within the database.
router.get("/api/allCompanies", async (req, res) => {
    try {
        const companies = await getCompanyTable()
        res.status(200).send(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send(error);
    }
});

// Endpoint that fetches all influencers currently created within the database.
router.get("/api/influencers", async (req, res) => {
    try {
        const influencers = await getInfluencerTable()
        res.status(200).send(influencers);
    } catch (error) {
        console.error('Error fetching influencers:', error);
        res.status(500).send(error);
    }
});

// Endpoint that fetches all jobs posted from a certain company (provided an actual companyID is provided that matches within database).
router.get("/api/jobs/:companyId", async (req, res) => {
    const {companyId} = req.params;
    try {
        const companyJobs = await getJobsByCompanyId(companyId)
        console.log(companyJobs)
        res.status(200).send(companyJobs)
    } catch (error) {
        res.status(400).json({message: error});
    }
});

//Test that the company id is working JONAH
router.post("/api/sendOffer", async (req, res) => {
    const {influencer_id, job_id, message, company_id} = req.body;
    try {
        await createNewNotification(company_id, influencer_id, job_id, message)
        res.json({status: 'success', message: 'Offer sent successfully'});
    } catch (error) {
        console.error('Error sending offer:', error);
        res.status(500).send(error);
    }
});

//Influencer get jobOffers API
// Endpoint that fetches all jobs offers currently sent to a certain influencer (providing influencerID matches actual influencer in database).
router.get("/api/jobOffers/:influencerId", async (req, res) => {
    const {influencerId} = req.params;
    try {
        const jobOffers = await getJobOffersForInfluencer(influencerId);
        res.status(200).json(jobOffers);
    } catch (error) {
        console.error('Error fetching job offers:', error);
        res.status(500).send(error);
    }
});

//Influencer AcceptJobOffer API
// Endpoint that updates database when influencer has accepted a job offer from a company.
router.post("/api/acceptJob", async (req, res) => {
    const {influencerId, jobId} = req.body;
    try {
        await addJobToInfluencer(influencerId, jobId);
        res.status(200).json({message: 'Job accepted successfully'});
    } catch (error) {
        console.error('Error accepting job:', error);
        res.status(500).send(error);
    }
});

//Influencer RejectJobOffer API
// Endpoint that updates database when influencer has rejected a job offer from a company.
router.post("/api/rejectJobOffer", async (req, res) => {
    const {offerId} = req.body; // offerId is the ID of the job offer (notification)
    try {
        await removeNotification(offerId);
        res.status(200).json({message: 'Job offer rejected successfully'});
    } catch (error) {
        console.error('Error rejecting job offer:', error); // console statement signifying error rejecting offer
    }
});

router.post('/api/getChatRoomsForUser', async (req, res) => {
    try {
        const data = req.body;
        await getAllMessagesRoomsForUser(data.userId)
        res.status(201).send({message: "New company added"});
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;