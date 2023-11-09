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

// Creates and inserts data into the database for a new user.
const createUserRegister = async (email, password, accountType) => {
    const queryText = 'INSERT INTO users (email, password, account_type) VALUES ($1, $2, $3) RETURNING id, email, account_type;';
    try {
        const result = await query(queryText, [email, password, accountType]);
        return result.rows[0]; // Return the new user
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to handle it in the express route
    }
};


module.exports = {
    query,
    findUserByEmail,
    updateUserPassword,
    createUserRegister
};