const mongoose = require('mongoose');

    const influencerSchema = new mongoose.Schema({
        _id: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        userName: { type: String, required: true }
    });

module.exports = mongoose.model('Influencer', influencerSchema);
