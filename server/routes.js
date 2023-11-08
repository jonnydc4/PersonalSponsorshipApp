const express = require('express');
const userController = require('./userController');
const {performLogin} = require("./userController");

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


module.exports = router;