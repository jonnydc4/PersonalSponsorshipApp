// routes.js - Express route definitions

const express = require('express');
const userController = require('../controllers/userController');
const jobController = require('../controllers/jobController')

const router = express.Router();

// Login endpoint called by LoginPage.js (Handles Login)
router.post("/api/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userController.performLogin(email, password)
        res.status(200).send({message: "User verified.", accountType: user.account_type})
    } catch (error) {
        const {errorMessage, statusCode} = userController.handleLoginError(error);
        return res.status(statusCode).json(errorMessage);
    }
});

// post a job to the database
router.post('/postJob', async (req, res) => {
    try {
        const id = 1 // todo need to update this magic number to something real
        const {title, description, location} = req.body;
        await jobController.postJob(id, title, description, location)
        res.status(200).send({message: 'Data added successfully'})
    } catch (error) {
        const {errorMessage, statusCode} = jobController.handleError(error);
        return res.status(statusCode).json(errorMessage);
    }

});




module.exports = router;