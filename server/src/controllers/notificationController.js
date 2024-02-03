const model = require('../models/model');

const createNotification = async (company_id, influencer_id, job_id, message) => {
    model.createNewNotification(company_id, influencer_id, job_id, message)
}

const getJobOffersForInfluencer = async (influencerId) => {
    return model.getJobOffersForInfluencer(influencerId);
};

const rejectJobOffer = async (offerId) => {
    await model.removeNotification(offerId);
};

module.exports = {
    createNotification,
    getJobOffersForInfluencer,
    rejectJobOffer
};