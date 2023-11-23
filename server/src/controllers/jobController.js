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
    const result = await model.getAllJobs()
    return result
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

module.exports = { postJob, allJobs, allCompanyJobs, handleAllCompanyJobsErrors }