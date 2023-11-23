const model = require("../models/model");

const allInfluencers = async () => {
    return await model.getAllInfluencers()
}

module.exports = {
    allInfluencers
}