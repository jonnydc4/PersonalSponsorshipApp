// <--------------- userController.js - contains all controllers dealing with user related operations --------------->
const model = require('../models/model');
const util = require('../utils/util')

// Checks whether the email is in the correct format (ex. no spaces, @ symbol, and a domain)
// Otherwise, it throws an error message.
const checkEmailFormat = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid Email.');
}

// Checks whether the email is empty. If it is, it throws an error message.
const checkEmailEmpty = (email) => {
    if (!email) throw new Error('Email is required.');
}

// Checks whether the password is empty. If it is, it throws an error message.
const checkPasswordEmpty = (password) => {
    if (!password) throw new Error('Password is required.');
}

// Checks whether the email and password fields are empty. If they are, it throws an error message.
const checkLoginFieldsEmpty = (email, password) => {
    if (!email || !password) {
        if (!email && !password) throw new Error('Email and password are required.');
        checkEmailEmpty(email)
        checkPasswordEmpty(password)
    }
}

// Checks whether the password is less than 8 characters. If it is, it throws an error message.
// MIN PASSWORD length is 8 characters.
const checkPasswordLength = (password) => {
    const MIN_PASSWORD_LENGTH = 8
    if (password.length < MIN_PASSWORD_LENGTH) throw new Error('Password too short.');
    //todo add a max password length
}

// This does not work - morgan (11/8/2023)
const verifyUserExists = async (email) => {
    const user = await model.findUserByEmail(email);

    if (!user) {
        throw new Error('User does not exist.');
    }

    return user
}

// Used to verify that the user does not exist in the database. If the user already exists, it throws an error message.
const verifyUserDoesNotExist = async (email) => {
    const user = await model.findUserByEmail(email);

    if (user) {
        throw new Error('User already exists.');
    }
}

// Authenticates the user by checking the password against the hashed password in the database.
const authenticateUserByPassword = async (username, password) => {
    const user = await verifyUserExists(username);

    // Here, you would check the password against a hashed password in a real application
    const isMatch = (password === user.password);
    if (!isMatch) {
        throw new Error('Incorrect Password.');
    }

    return user;
};

// Attempts to perform login for user signing into service by calling previous methods defined above 
// or below in this controller (usercontroller.js).
const performLogin = async (email, password) => {
    checkLoginFieldsEmpty(email, password);
    checkEmailFormat(email);
    checkPasswordLength(password);
    const user = await authenticateUserByPassword(email, password);
    return user
}

// Attempts to perform register for new user signing up for service
const performRegister = async (accountInfo) => {
    const accountType = accountInfo.accountType
    const email = accountInfo.email
    const password = accountInfo.password

    checkLoginFieldsEmpty(email, password);
    checkEmailFormat(email);
    checkPasswordLength(password);
    await verifyUserDoesNotExist(email); 

    const uuid = util.generateUniqueId()
    const user = await model.createNewUser(uuid, email, password, accountType);

    let name = ''
    let address = ''

    // Depending on user type, create a new user in the database. 
    // This is because companies and influencers have different fields in the database.
    switch (accountType) {
        case "influencer":
            name = accountInfo.name
            await model.createNewInfluencer(uuid, name, email)
            break
        case "company":
            name = accountInfo.name
            address = accountInfo.address
            await model.createNewCompany(uuid, name, email, address)
            break
        default:
            throw new Error('Invalid Account Type')
            break
    }

    return user
}

// Error handling used in dealing with login related errors.
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

// Refactor later with the one above (addded check for throwing error for user that already exists)
function handleAccountSignupError(error) {
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
        case 'User already exists.':
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


module.exports = {performLogin, handleLoginError, performRegister, handleAccountSignupError};