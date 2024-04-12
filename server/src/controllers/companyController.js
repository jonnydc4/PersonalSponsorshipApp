// <--------------- companyController.js - contains all controllers used in company side operations --------------->
// Company controller acts as the middleman between the routes and the model.
// It is responsible for handling the business logic and passing the data to the model.

const model = require("../models/model");

// Fetches all companies and awaits the response from the model. If successful, returns the data (all companies within the database).
// For further details, see model.js
const allCompanies = async () => {
    return await model.getAllCompanies()
}

// Exporting the functions to be used in the routes 
// (Important Note: You must add your function to the export, in order for the module to be used).
module.exports = {
    allCompanies
}

// <---------------  --------------->