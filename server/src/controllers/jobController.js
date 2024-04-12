// <--------------- jobcontroller.js - contains all controllers that deal with job related operations --------------->
// Job controller acts as the middleman between the routes and the model.
// It is responsible for handling the business logic and passing the data to the model.

const model = require('../models/model');
const util = require('../utils/util')

// Throws error if the company id is not valid - come back to this one Morgan 2/21/2024
const validateCompanyId = (companyId) => {
    if (!companyId) throw new Error('Missing company id for input')
    // todo check if exists in database
}
// Controller for posting a job to the database. 
// company_id, title, description, location are the parameters that are passed in from the client side.
// For further details, see model.js
const postJob = async (company_id, title, description, location) => {
    // todo throw errors if the process fails
    const result = await model.createNewJob(company_id, title, description, location)
}

// Fetches all jobs and awaits the response from the model. If successful, returns the data (all jobs within the database).
// For further details, see model.js
const allJobs = async () => {
    const allJobs = await model.getAllJobs()
    return allJobs
}

// Fetches all jobs for a specific company and awaits the response from the model. If successful, returns the data (all jobs within the database for a specific company).
// For further details, see model.js
const allCompanyJobs = async (companyId) => {
    validateCompanyId(companyId)
    return model.getJobsByCompanyId(companyId)
}

// Error handling used in dealing with Company Jobs.
const handleAllCompanyJobsErrors = (errorMessage) => {
    let statusCode;

    switch (errorMessage) {
        case 'Missing company id for input':
            statusCode = 400;
            break;
        case 'Company id must be a number':
            statusCode = 400;
            break;
    }
    return {errorMessage, statusCode}
}

// This function is used to add a job to an influencer once they have accepted it.
// influencerId, jobId are the parameters that are passed in from the client side.
const acceptJob = async (influencerId, jobId) => {
    await model.addJobToInfluencer(influencerId, jobId);
};

// Exporting the functions to be used in the routes 
// (Important Note: You must add your function to the export, in order for the module to be used).
module.exports = { postJob, allJobs, allCompanyJobs, handleAllCompanyJobsErrors, acceptJob }