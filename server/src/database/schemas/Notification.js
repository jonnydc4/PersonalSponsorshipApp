module.exports = function(mongoose) {
    const notificationSchema = new mongoose.Schema({
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer' },
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        notificationTime: { type: Date, default: Date.now }
    });


    return mongoose.model('Notification', notificationSchema);
};
