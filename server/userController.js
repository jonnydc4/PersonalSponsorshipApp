// userController.js - Controller that handles user-related operations

const userModel = require('./userModel');

/*---Login Functions---*/
const checkLoginFields = (email, password) => {
    // Empty field check
    if (!email && !password) throw new Error('Email and password are required.');
    if (!email) throw new Error('Email is required.');
    if (!password) throw new Error('Password is required.');

    // Email format check
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid Email.');

    // Password length check
    if (password.length < 8) throw new Error('Password too short.');
}

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

    return { errorMessage, statusCode };
}



module.exports = {authenticateUser, checkLoginFields, handleLoginError};
