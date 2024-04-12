// <--------------- Influencer Controller - contains all controllers used in influencer side operations --------------->
// Influencer controller acts as the middleman between the routes and the model.
// It is responsible for handling the business logic and passing the data to the model.

const model = require("../models/model");

// Fetches all influencers and awaits the response from the model. If successful, returns the data (all influencers within the database).
// For further details, see model.js
const allInfluencers = async () => {
    return await model.getAllInfluencers()
}

// Exporting the functions to be used in the routes 
// (Important Note: You must add your function to the export, in order for the module to be used).
module.exports = {
    allInfluencers
}