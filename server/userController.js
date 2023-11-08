// userController.js - Controller that handles user-related operations

const userModel = require('./userModel');

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

const verifyUserExists = async (email) => {
    const user = await userModel.findUser(email);

    if (!user) {
        throw new Error('User does not exist.');
    }

    return user
}

const authenticateUserByPassword = async (username, password) => {
    const user = await verifyUserExists(username);

    // Here, you would check the password against a hashed password in a real application
    const isMatch = (password === user.password);
    if (!isMatch) {
        throw new Error('Incorrect Password.');
    }

    return user;
};

const performLogin = async (email, password) => {
    checkLoginFieldsEmpty(email, password)
    checkEmailFormat(email)
    checkPasswordLength(password)
    const user = await authenticateUserByPassword(email, password)
    return user
}

const performRegister = async (email, password) => {
    checkLoginFieldsEmpty(email, password)
    checkEmailFormat(email)
    checkPasswordLength(password)
    // userModel.findUser(email)
    // const user = await userModel.createUser(email, password) // implment create user later
    return user
}

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


module.exports = {performLogin, handleLoginError, performRegister};
