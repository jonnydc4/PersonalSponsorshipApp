const express = require('express');
const userController = require('./userController');

const router= express.Router();
router.post("/api/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        userController.checkLoginFields(email, password);
        await userController.authenticateUser(email, password);
        res.status(200).send({ message: "User verified." })

    } catch (error) {
        const { errorMessage, statusCode } = userController.handleLoginError(error);
        return res.status(statusCode).json(errorMessage);
    }
});

module.exports = router;