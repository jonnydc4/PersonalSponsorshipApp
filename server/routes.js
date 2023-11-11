// routes.js - Express route definitions

const express = require('express');
const userController = require('./userController');
const {performLogin} = require("./userController");

const router = express.Router();

// Login endpoint called by LoginPage.js (Handles Login)
router.post("/api/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await performLogin(email, password)
        res.status(200).send({message: "User verified.", accountType: user.account_type})

    } catch (error) {
        const {errorMessage, statusCode} = userController.handleLoginError(error);
        return res.status(statusCode).json(errorMessage);
    }
});


module.exports = router;