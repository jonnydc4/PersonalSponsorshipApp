const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    phoneNumber: { type: String }, // Add phoneNumber field
    email: { type: String },
    about: { type: String } // Add about field to describe the influencer
});

module.exports = mongoose.model('Influencer', influencerSchema);
