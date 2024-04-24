const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    company: { type: String, ref: 'Company' },  // Changed to String
    influencer: { type: String, ref: 'Influencer' },  // Changed to String
    job: { type: String, ref: 'Job' },  // Changed to String
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    notificationTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
