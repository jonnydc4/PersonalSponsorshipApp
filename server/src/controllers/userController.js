// userController.js - Controller that handles user-related operations

const model = require('../models/model');

const checkEmailFormat = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid Email.');
}

const checkEmailEmpty = (email) => {
    if (!email) throw new Error('Email is required.');
}

const checkPasswordEmpty = (password) => {
    if (!password) throw new Error('Password is required.');
}

const checkLoginFieldsEmpty = (email, password) => {
    if (!email || !password) {
        if (!email && !password) throw new Error('Email and password are required.');
        checkEmailEmpty(email)
        checkPasswordEmpty(password)
    }
}

const checkPasswordLength = (password) => {
    const MIN_PASSWORD_LENGTH = 8
    if (password.length < MIN_PASSWORD_LENGTH) throw new Error('Password too short.');
    //todo add a max password length
}

// Verify that an email is found in the user table in db. On success returns that user's info.
const verifyUserExists = async (email) => {
    const user = await model.findUser(email);

    if (!user) {
        throw new Error('User does not exist.');
    }

    return user
}

// Takes an email and password and returns the related user's info from user table in database if user exists and password is correct.
const authenticateUserByPassword = async (email, password) => {
    const user = await verifyUserExists(email);

    // todo Here, you would check the password against a hashed password in a real application
    const isMatch = (password === user.password);
    if (!isMatch) {
        throw new Error('Incorrect Password.');
    }

    return user;
};

// Puts together the whole login process. On success returns a user's info.
const performLogin = async (email, password) => {
    checkLoginFieldsEmpty(email, password)
    checkEmailFormat(email)
    checkPasswordLength(password)
    const user = await authenticateUserByPassword(email, password)
    return user
}

// Takes an error object and returns a new error message object and an HTTP status code.
function handleLoginError(error) {
    let errorMessage = {};
    let statusCode;

    switch (error.message) {
        case 'Email and password are required.':
            errorMessage['emailError'] = 'Email is required.';
            errorMessage['passwordError'] = 'Password is required.';
            statusCode = 400;
            break;
        case 'Email is required.':
            errorMessage['emailError'] = error.message;
            statusCode = 400;
            break;
        case 'Password is required.':
            errorMessage['passwordError'] = error.message;
            statusCode = 400;
            break;
        case 'Invalid Email.':
            errorMessage['emailError'] = error.message;
            statusCode = 400;
            break;
        case 'Password too short.':
            errorMessage['passwordError'] = 'Password minimum of 8 characters.';
            statusCode = 400;
            break;
        case 'User does not exist.':
            errorMessage['emailError'] = error.message;
            statusCode = 401;
            break;
        case 'Incorrect Password.':
            errorMessage['passwordError'] = error.message;
            statusCode = 401;
            break;
        default:
            console.error(error.message);
            errorMessage['error'] = 'An error occurred during the login process.';
            statusCode = 500;
            break;
    }

    return {errorMessage, statusCode};
}


module.exports = {performLogin, handleLoginError};
