// database.js - Database queries used in the application

const {Pool} = require("pg");

const pool = new Pool({
    password: "root",
    user: "root",
    host: "postgres",
});

// A function to query the database and return results
const query = (text, params) => pool.query(text, params);

const findUserByEmail = async (email) => {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const {rows} = await query(queryText, [email]);
    return rows[0]; // returns undefined if no user is found
};

const updateUserPassword = async (email, newPassword) => {
    const queryText = 'UPDATE users SET password = $1 WHERE email = $2;';
    await query(queryText, [newPassword, email]);
};

const createNewJob = async (company_id, title, description, location) => {
    const queryText = `
            INSERT INTO jobs (company_id, title, description, location)
            VALUES ($1, $2, $3, $4)
        `
    await query(queryText, [company_id, title, description, location]);
}

process.on('exit', () => {
    console.log("Closing db pool");
    pool.end();
})

module.exports = {
    query,
    findUserByEmail,
    updateUserPassword,
    createNewJob
};