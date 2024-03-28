module.exports = function(mongoose) {
    const companySchema = new mongoose.Schema({
        id: mongoose.Schema.Types.ObjectId,
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true
        },
        address: String
    });

    return mongoose.model('Company', companySchema);
};
