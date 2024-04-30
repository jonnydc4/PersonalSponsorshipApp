const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    userName: {type: String},
    address: String,
    phoneNumber: { type: String }, // Add phoneNumber field
    email: { type: String }, // Add email field
    about: { type: String } // Add about field to describe the company
});

module.exports = mongoose.model('Company', companySchema);