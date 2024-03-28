const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['influencer', 'company'] // Specifies the allowed user types
    },
    // Fields specific to influencers
    influencerDetails: {
        name: String,
        // other influencer specific fields
    },
    // Fields specific to companies
    companyDetails: {
        name: String,
        address: String,
        // other company specific fields
    },
});

module.exports = mongoose.model('User', userSchema);
