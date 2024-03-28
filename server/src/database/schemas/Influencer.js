module.exports = function(mongoose) {
    const influencerSchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true }
    });


    return mongoose.model('Influencer', influencerSchema);
};
