// <--------------- notificationController.js - contains all controllers used in notifcation related operations --------------->
// Notification controller acts as the middleman between the routes and the model.
// It is responsible for handling the business logic and passing the data to the model.

const model = require('../models/model');

// This function is used to create a notification for the influencer when a company sends them a job offer.
// company_id, influencer_id, job_id, message are the parameters that are passed in from the client side.
// For further details, see model.js
const createNotification = async (company_id, influencer_id, job_id, message) => {
    model.createNewNotification(company_id, influencer_id, job_id, message)
}

// This function is used to fetch all job offers for a specific influencer.
// For further details, see model.js
const getJobOffersForInfluencer = async (influencerId) => {
    return model.getJobOffersForInfluencer(influencerId);
};

// This function is used to reject a job offer from a company.
// For further details, see model.js
const rejectJobOffer = async (offerId) => {
    await model.removeNotification(offerId);
};

// Exporting the functions to be used in the routes
// (Important Note: You must add your function to the export, in order for the module to be used).
module.exports = {
    createNotification,
    getJobOffersForInfluencer,
    rejectJobOffer
};