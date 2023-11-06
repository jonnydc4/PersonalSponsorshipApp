// userController.js - Controller that handles user-related operations

const userModel = require('./userModel');

const authenticateUser = async (username, password) => {
    const user = await userModel.findUser(username);

    if (!user) {
        throw new Error('User does not exist.');
    }

    // Here, you would check the password against a hashed password in a real application
    const isMatch = (password === user.password);
    if (!isMatch) {
        throw new Error('Incorrect Password.');
    }

    return user;
};

module.exports = { authenticateUser };
