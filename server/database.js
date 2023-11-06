const {Pool} = require("pg");

const pool = new Pool({
    password: "root",
    user: "root",
    host: "postgres",
});

// A function to query the database and return results
const query = (text, params) => pool.query(text, params);

const findUserByUsername = async (username) => {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await query(queryText, [username]);
    return rows[0]; // returns undefined if no user is found
};

module.exports = {
    query,
    findUserByUsername
};