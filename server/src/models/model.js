// model.js - User model that interacts with the database

const db = require('../database/database');

/* ------------------------Create------------------------ */
const createNewJob = async (company_id, title, description, location) => {
    return db.createNewJob(company_id, title, description, location)
}

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    return db.createNewNotification(company_id, influencer_id, job_id, message)
}

/* ------------------------Read------------------------ */
const findUserByEmail = async (email) => {
    return db.findUserByEmail(email);
};

const getAllJobs = async () => {
    return db.getJobTable()
}

const getAllCompanies = async () => {
    return db.getCompanyTable()
}

const getAllInfluencers = async () => {
    const influencers = await db.getInfluencerTable()
    return influencers.rows
}

const getJobsByCompanyId = async (companyId) => {
    const companyJobs = db.getJobsByCompany(companyId)
    return companyJobs.rows
}

/* ------------------------Update------------------------ */
const resetUserPassword = async (email, newPassword) => {
    return db.updateUserPassword(email, newPassword);
}

/* ------------------------Delete------------------------ */













module.exports = {
    findUserByEmail,
    createNewJob,
    getAllJobs,
    getAllCompanies,
    getAllInfluencers,
    getJobsByCompanyId,
    createNewNotification
}
