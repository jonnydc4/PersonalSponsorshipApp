// model.js - User model that interacts with the database

const db = require('../database/database');

/* ------------------------Create------------------------ */
const createNewJob = async (company_id, title, description, location) => {
    return await db.createNewJob(company_id, title, description, location)
}

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    return await db.createNewNotification(company_id, influencer_id, job_id, message)
}

/* ------------------------Read------------------------ */
const findUserByEmail = async (email) => {
    return await db.findUserByEmail(email);
};

const getAllJobs = async () => {
    return await db.getJobTable()
}

const getAllCompanies = async () => {
    return await db.getCompanyTable()
}

const getAllInfluencers = async () => {
    const influencers = await db.getInfluencerTable()
    return influencers.rows
}

const getJobsByCompanyId = async (companyId) => {
    const companyJobs = await db.getJobsByCompanyId(companyId)
    return companyJobs.rows
}

const getCompanyById = async (companyId) => {
    const company = await db.getCompanyById(companyId)
    return company
}

const getInfluencerById = async (influencerId) => {
    const influencer = await db.getInfluencerById(influencerId)
    return influencer
}

/* ------------------------Update------------------------ */
const resetUserPassword = async (email, newPassword) => {
    return await db.updateUserPassword(email, newPassword);
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
