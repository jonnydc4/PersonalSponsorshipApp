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
        const { email, password } = req.body;
        const user = await performRegister(email, password);

        if (user) {
            // If the user already exists, send a 400 status code.
            return res.status(400).send({ message: 'Email already used' });
        } else {
            // If the user does not exist, proceed to create a new user
            // const newUser = await createUser(email, password); // Implement this function IMPLMENT LATER
            return res.status(200).send({ message: 'User created successfully', accountType: newUser.account_type });
        }
    } catch (error) {
        const { errorMessage, statusCode } = userController.handleLoginError(error);
        return res.status(statusCode).json(errorMessage);
    }
});


module.exports = router;