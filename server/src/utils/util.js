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
    // Encrypts password before saving to database.  
    const saltRounds = 10; // You can adjust the number of rounds
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    return encryptedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    // Used to compare password when user logs in, to the hashed password that is stored in the database.
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    isUserEmail,
    isNotANumber,
    encryptPassword,
    comparePassword
}