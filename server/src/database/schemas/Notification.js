module.exports = function(mongoose) {
    const notificationSchema = new mongoose.Schema({
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            default: null
        },
        influencer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Influencer',
            default: null
        },
        job_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            default: null
        },
        message: {
            type: String,
            required: true
        },
        is_read: {
            type: Boolean,
            default: false
        },
        notification_time: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Notification', notificationSchema);
};
