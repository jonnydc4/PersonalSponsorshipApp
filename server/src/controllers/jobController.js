const model = require('../models/model');

const postJob = async (company_id, title, description, location) => {
    // todo throw errors if the process fails
    const result = await model.createNewJob(company_id, title, description, location)
}

const allJobs = async () => {
    const result = await model.getAllJobs()
    return result
}

const handleError = () => {
    // todo later
    let errorMessage = 'Some error happened';
    let statusCode = 500;

    return {errorMessage, statusCode}
}

module.exports = { postJob, handleError, allJobs }