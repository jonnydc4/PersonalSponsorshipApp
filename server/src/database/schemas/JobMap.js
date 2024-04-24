const mongoose = require('mongoose');

    const jobMapSchema = new mongoose.Schema({
        //job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        //influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true }
        job: { type: String, ref: 'Job', required: true },  // Changed from ObjectId to String if Job IDs become strings
        influencer: { type: String, ref: 'Influencer', required: true }  // Changed from ObjectId to String if Influencer IDs become strings
    });

    module.exports = mongoose.model('JobMap', jobMapSchema);

