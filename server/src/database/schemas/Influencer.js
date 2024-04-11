const mongoose = require('mongoose');

    const influencerSchema = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    });

module.exports = mongoose.model('Influencer', influencerSchema);
