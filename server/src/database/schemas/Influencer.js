const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    phoneNumber: { type: String }, // Add phoneNumber field
    email: { 
        type: String, 
        required: true,
        unique: true,
        lowercase: true, // Convert email to lowercase
        validate: {
            validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },
            message: 'Please fill a valid email address',
        },
    },
    about: { type: String } // Add about field to describe the influencer
});

module.exports = mongoose.model('Influencer', influencerSchema);
