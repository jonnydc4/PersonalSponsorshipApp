const express = require('express');
const userController = require('./userController');
const {performLogin} = require("./userController");
const {performRegister} = require("./userController");
const { findUserByEmail } = require('./database');

const router = express.Router();
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

// Endpoint to handle user registration
router.post('/api/register', async (req, res) => {
    try {
        const { email, password, accountType } = req.body;
        const user = await performRegister(email, password, accountType);
        res.status(200).send({message: "User created successfully", accountType: user.account_type });
    } catch (error) {
        console.log(error);
        const { errorMessage, statusCode } = userController.handleaccountSignupError(error);
        return res.status(statusCode).json(errorMessage);
    }
});


module.exports = router;