// userModel.js - User model that interacts with the database

const db = require('./database');

const findUser = async (email) => {
    return db.findUserByEmail(email);
};

const resetUserPassword = async (email, newPassword) => {
    return db.updateUserPassword(email, newPassword);
}


module.exports = { findUser };
