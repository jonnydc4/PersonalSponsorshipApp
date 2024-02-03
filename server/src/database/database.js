// database.js - Database queries used in the application

const {Pool} = require("pg");

const pool = new Pool({
    password: "root",
    user: "root",
    host: "postgres",
});

// A function to query the database and return results
const query = async (text, params) => {
    const client = await pool.connect();
    try {
        return await client.query(text, params);
    } catch (error) {
        console.error('Database query error', error);
        throw error; // rethrow the error for further handling
    } finally {
        client.release(); // Ensure the client is released back to the pool
    }
};

/* ------------------------User Table Queries------------------------ */
const findUserByEmail = async (email) => {
    const queryText = 'SELECT * FROM users WHERE email = $1';
    const {rows} = await query(queryText, [email]);
    return rows[0]; // returns undefined if no user is found
};

const updateUserPassword = async (email, newPassword) => {
    const queryText = 'UPDATE users SET password = $1 WHERE email = $2;';
    await query(queryText, [newPassword, email]);
};


/* ------------------------Job Table Queries------------------------ */
const createNewJob = async (company_id, title, description, location) => {
    const queryText = `
            INSERT INTO jobs (company_id, title, description, location)
            VALUES ($1, $2, $3, $4)
        `
    await query(queryText, [company_id, title, description, location]);
}

const getJobTable = async () => {
    const queryText = 'SELECT * FROM jobs';
    const jobsTable = await query(queryText, [])
    return jobsTable.rows
}

const getJobsByCompanyId = async (companyId) => {
    const queryText = 'SELECT * FROM jobs WHERE company_id = $1'
    return await query(queryText, [companyId]);
}

/* ------------------------Job map Table Queries------------------------ */
const getJobMapTable = async () => {
    const queryText = 'SELECT * FROM job_map';
    return await query(queryText, [])
}

/**
 * Updates a job in the database with the given data.
 * @param {number} jobId - The ID of the job to be updated.
 * @param {Object} jobData - The data to update in the job (e.g., title, description, location).
 */
const updateJob = async (jobId, jobData) => {
    const { title, description, location } = jobData;
    const queryText = 'UPDATE jobs SET title = $1, description = $2, location = $3 WHERE id = $4';
    await query(queryText, [title, description, location, jobId]);
};

/* ------------------------Company Table Queries------------------------ */
const getCompanyTable = async () => {
    const queryText = 'SELECT * FROM companies';
    const companiesTable = await query(queryText, [])
    return companiesTable.rows
}

/* ------------------------Influencer Table Queries------------------------ */
const getInfluencerTable = async () => {
    const queryText = 'SELECT * FROM influencers';
    return await query(queryText, [])
}

/* ------------------------Notification Table Queries------------------------ */
const getNotificationTable = async () => {
    const queryText = 'SELECT * FROM notifications';
    return await query(queryText, [])
}

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    const queryText = `
            INSERT INTO notifications (company_id, influencer_id, job_id, message)
            VALUES ($1, $2, $3, $4)
        `
    return await query(queryText, [company_id, influencer_id, job_id, message])
}


process.on('exit', () => {
    console.log("Closing db pool");
    pool.end();
})

module.exports = {
    query,
    findUserByEmail,
    updateUserPassword,
    createNewJob,
    getJobTable,
    getCompanyTable,
    getInfluencerTable,
    getJobsByCompanyId,
    getNotificationTable,
    createNewNotification,
    updateJob
};