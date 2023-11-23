const model = require("../models/model");

const allCompanies = async () => {
    return await model.getAllCompanies()
}

module.exports = {
    allCompanies
}