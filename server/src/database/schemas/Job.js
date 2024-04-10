const mongoose = require('mongoose');

    const jobSchema = new mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
        title: { type: String, required: true },
        description: String,
        location: String
    });

    module.exports = mongoose.model('Job', jobSchema);

