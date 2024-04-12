const mongoose = require('mongoose');

    const companySchema = new mongoose.Schema({
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        address: String
    });


    module.exports = mongoose.model('Company', companySchema);

