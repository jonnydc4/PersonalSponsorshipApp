// model.js - User model that interacts with the database

const db = require('../database/database');

/* ------------------------Create------------------------ */
const createNewJob = async (company_id, title, description, location) => {
    return await db.createNewJob(company_id, title, description, location)
}

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    return await db.createNewNotification(company_id, influencer_id, job_id, message)
}

const createNewUser = async (id, email, password, accountType) => {
    return db.createNewUser(id, email, password, accountType);
}

const createNewInfluencer = async (id, name, email) => {
    return db.createNewInfluencer(id, name, email);
}

const createNewCompany = async (id, companyName, email, address) => {
    return db.createNewCompany(id, companyName, email, address);
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
    const companyJobs = await db.getJobsByCompany(companyId)
    return companyJobs.rows
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
    createNewNotification,
    createNewUser,
    createNewInfluencer,
    createNewCompany
}
