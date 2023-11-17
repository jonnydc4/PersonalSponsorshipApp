// model.js - User model that interacts with the database

const db = require('../database/database');

const findUser = async (email) => {
    return db.findUserByEmail(email);
};

const resetUserPassword = async (email, newPassword) => {
    return db.updateUserPassword(email, newPassword);
}

const createNewJob = async (company_id, title, description, location) => {
    return db.createNewJob(company_id, title, description, location)
}


module.exports = { findUser, createNewJob };
