const mongoose = require('mongoose');

    const companySchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        address: String
    });


    module.exports = mongoose.model('Company', companySchema);

