const model = require('../models/model');
const util = require('../utils/util')

const validateCompanyId = (companyId) => {
    if (!companyId) throw new Error('Missing company id for input')
    if (util.isNotANumber(companyId)) throw new Error('Company id must be a number')
}
const postJob = async (company_id, title, description, location) => {
    // todo throw errors if the process fails
    const result = await model.createNewJob(company_id, title, description, location)
}

const allJobs = async () => {
    const allJobs = await model.getAllJobs()
    return allJobs
}

const allCompanyJobs = async (companyId) => {
    validateCompanyId(companyId)
    return model.getJobsByCompanyId(companyId)
}

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

//add job to influencer once accepted
const acceptJob = async (influencerId, jobId) => {
    await model.addJobToInfluencer(influencerId, jobId);
};


module.exports = { postJob, allJobs, allCompanyJobs, handleAllCompanyJobsErrors, acceptJob }