// userModel.js - User model that interacts with the database

const db = require('./database');

const findUser = async (username) => {
    return db.findUserByUsername(username);
};

module.exports = { findUser };
