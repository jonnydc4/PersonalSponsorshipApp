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
    getAllMessagesRoomsForUser,
    getInfluencerIdByUsername,
    getCompanyIdByName,
    createNewMessage,
    updateJob,
    updateCompanyProfile,
    updateInfluencerProfile,
    findExistingChatRoom
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
        await createNewInfluencer(
            data.userId,
            data.firstName,
            data.lastName,
            data.userName, 
            data.email,
        )
        res.status(201).send({message: "New influencer added"});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Creates a new company in database
router.post('/api/createNewCompany', async (req, res) => {
    try {
        const data = req.body;
        await createNewCompany(data.userId, data.companyName, data.address, data.email)
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

// Endpoint that updates a job in the database (providing the jobID matches an actual job in the database). 
router.put('/api/jobs-updates/:jobId', async (req, res) => {
    const { jobId } = req.params;
    const {title, description, location, companyId} = req.body;
    try {
        await updateJob(jobId, title, description, location);
        res.status(200).send({message: 'Job updated successfully'});
    } catch (error) {
        console.error('Error updating job:', error);
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
        console.log('JOB ID BITCH: ', job_id)
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
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
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

router.get('/api/getChatRoomsForUser', async (req, res) => {
    try {
        const {userId} = req.query;
        const chatRooms = await getAllMessagesRoomsForUser(userId)
        res.status(201).send(chatRooms);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/api/createNewChatRoom', async (req, res) => {
    try {
        const data = req.body;
        let user2Id = null
        if (data.currentUserType === 'company') {
            user2Id = await getInfluencerIdByUsername(data.invitedUser)
        } else if (data.currentUserType === "influencer") {
            user2Id = await getCompanyIdByName(data.invitedUser)
        } else {
            throw Error("User type is invalid.")
        }
        if (user2Id === undefined) {throw Error} // Invited user was not found in any database.

        const existingRoom = await findExistingChatRoom(data.currentUserId, user2Id)
        if (existingRoom) {
            return res.status(200).json({message: "Existing chatroom found", chatroomId: existingRoom._id})
        }
        await createNewMessagesRoom(data.currentUserId, data.currentUserName, user2Id, data.invitedUser)
        // console.log("Createnewchat worked kinda")
        res.status(201).send({message: "New chatroom created"});
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/api/createNewMessage', async (req, res) => {
    const { chatRoomId, senderId, message } = req.body;

    // Validate the incoming data
    if (!chatRoomId || !senderId || !message) {
        return res.status(400).json({
            error: 'Missing required fields',
            requiredFields: ['chatRoomId', 'senderId', 'message']
        });
    }

    // Do the thing
    try {
        const result = await createNewMessage(chatRoomId, senderId, message);
        console.log('Message created:', result);
        res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
        console.error('Failed to create message:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: error.message || 'An unknown error occurred'
        });
    }
});
router.post('/api/updateCompany', async (req, res) => {
    try {
        const { name, address, phoneNumber, email, about, username } = req.body;
        const profileData = {
            name: name,
            userName: username,
            address: address,
            email: email,
            phoneNumber: phoneNumber,
            about: about
        }
        const companyId = req.query.id;
        const updatedCompany = await updateCompanyProfile(companyId, profileData);
        if (updatedCompany) {
            res.status(200).json({ message: 'Company profile updated successfully', data: updatedCompany });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error('Failed to update company profile:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Route to update an influencer's profile
router.post('/api/updateInfluencer', async (req, res) => {
    try {
        const { username, email, phoneNumber, about } = req.body;
        const influencerId = req.query.id; 

        // Constructing profile data object to pass to the database function
        const profileData = {
            userName: username,
            email: email,
            phoneNumber: phoneNumber,
            about: about
        };
        const updatedInfluencer = await updateInfluencerProfile(influencerId, profileData);
        res.status(200).json({
            message: "Influencer profile updated successfully",
            data: updatedInfluencer
        });
    } catch (error) {
        console.error('Failed to update influencer profile... Routes:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.toString() });
    }
});




module.exports = router;