const mongoose = require('mongoose');

    const influencerSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true }
    });

module.exports = mongoose.model('Influencer', influencerSchema);
