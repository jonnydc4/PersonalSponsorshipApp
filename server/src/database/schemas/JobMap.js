module.exports = function(mongoose) {
    const jobMapSchema = new mongoose.Schema({
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true }
    });

    return mongoose.model('JobMap', jobMapSchema);
};
