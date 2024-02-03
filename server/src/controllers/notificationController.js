const model = require('../models/model');

const createNotification = async (company_id, influencer_id, job_id, message) => {
    model.createNewNotification(company_id, influencer_id, job_id, message)
}

module.exports = {
    createNotification
}