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

module.exports = {
    isUserEmail,
    isNotANumber
}