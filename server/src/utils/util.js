// Functions here should be 100% reusable
const model = require('../models/model');
const {v4 : uuidv4} = require('uuid')

const isUserEmail = async (email) => {
    const user = await model.findUserByEmail(email)
    return user != null;
}

const isNotANumber = (string) => {
    const radix = 10
    return isNaN(parseInt(string, radix))
}

const generateUniqueId = () => {
    return uuidv4()
}

module.exports = {
    isUserEmail,
    isNotANumber,
    generateUniqueId
}