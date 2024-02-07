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

const createNewUser = async (id, email, password, accountType) => {
    const queryText = 'INSERT INTO users (id, email, password, account_type) VALUES ($1, $2, $3, $4) RETURNING id, email, account_type;';
        const result = await query(queryText, [id, email, password, accountType]);
        return result.rows[0];
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

const getJobById = async (jobId) => {
    const queryText = 'SELECT * FROM jobs WHERE id = $1';
    return await query(queryText, [jobId]);
}

const updateJobDetails = async (jobId, title, description, location) => {
    // Updates existing job title, description, and location using jobId provided
    const query = 'UPDATE jobs SET title = $1, description = $2, location = $3 WHERE id = $4 RETURNING *';
    const values = [title, description, location, jobId];
    try {
      const { rows } = await db.query(query, values);
      return rows[0]; // Returns the updated job object
    } catch (err) {
      console.error('Error updating job details:', err);
      throw err;
    }
};

  
/* ------------------------Job map Table Queries------------------------ */
const getJobMapTable = async () => {
    const queryText = 'SELECT * FROM job_map';
    return await query(queryText, [])
}

/* ------------------------Company Table Queries------------------------ */
const getCompanyTable = async () => {
    const queryText = 'SELECT * FROM companies';
    const companiesTable = await query(queryText, [])
    return companiesTable.rows
}
const getCompanyById = async (companyId) => {
    const queryText = 'SELECT * FROM companies WHERE id = $1'
    return await query(queryText, [companyId]);
}

const createNewCompany = async (id, companyName, email, address) => {
    const queryText = 'INSERT INTO companies (id, name, email, address) VALUES ($1, $2, $3, $4) RETURNING id, name, email, address;';
    const result = await query(queryText, [id, companyName, email, address]);
    return result.rows[0];
};

/* ------------------------Influencer Table Queries------------------------ */
const getInfluencerTable = async () => {
    const queryText = 'SELECT * FROM influencers';
    return await query(queryText, [])
}

const getInfluencerById = async (influencerId) => {
    const queryText = 'SELECT * FROM companies WHERE id = $1'
    return await query(queryText, [influencerId]);
}

const createNewInfluencer = async (id, name, email) => {
    const queryText = 'INSERT INTO influencers (id, name, email) VALUES ($1, $2, $3) RETURNING id, name, email;';
    const result = await query(queryText, [id, name, email]);
    return result.rows[0];
};

/* ------------------------Notification Table Queries------------------------ */
const getNotificationTable = async () => {
    const queryText = 'SELECT * FROM notifications';
    return await query(queryText, [])
}

const addJobToInfluencer = async (influencerId, jobId) => {
    const queryText = 'INSERT INTO job_map (job_id, influencer_id) VALUES ($1, $2)';
    await query(queryText, [jobId, influencerId]);
};

const createNewNotification = async (company_id, influencer_id, job_id, message) => {
    const queryText = `
            INSERT INTO notifications (company_id, influencer_id, job_id, message)
            VALUES ($1, $2, $3, $4)
        `
    return await query(queryText, [company_id, influencer_id, job_id, message])
}

const getJobOffersForInfluencer = async (influencerId) => {
    const queryText = `
        SELECT n.id, n.company_id, n.job_id, n.message, n.is_read, n.notification_time,
               j.title, j.description, j.location,
               c.name as company_name
        FROM notifications n
        JOIN jobs j ON n.job_id = j.id
        JOIN companies c ON j.company_id = c.id
        WHERE n.influencer_id = $1;
    `;
    const result = await query(queryText, [influencerId]);
    return result.rows;
};

//delete the notification from the table
const removeNotification = async (offerId) => {
    const queryText = 'DELETE FROM notifications WHERE id = $1';
    await query(queryText, [offerId]);
};

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
    getJobById,
    updateJobDetails,
    getNotificationTable,
    createNewNotification,
    getJobOffersForInfluencer,
    addJobToInfluencer,
    removeNotification,
    createNewUser,
    createNewInfluencer,
    createNewCompany
};

