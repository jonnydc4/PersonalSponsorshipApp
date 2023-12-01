// Functions here should be 100% reusable
const model = require('../models/model');

const isUserEmail = async (email) => {
    const user = await model.findUserByEmail(email)
    return user != null;
}

const isNotANumber = (string) => {
    const radix = 10
    return isNaN(parseInt(string, radix))
}

const encryptPassword = async (password) => {
    // Encrypts password before saving to database (function returns a encrypted password) 
    const saltRounds = 10; 
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    // Used to pass in the password and the hashed password to compare them. 
    // Returns true if they match, false if not.
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    isUserEmail,
    isNotANumber,
    encryptPassword,
    comparePassword
}