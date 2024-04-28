const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Uses the current date and time
    sender: { type: String, required: true }, // Identifier for sender type ex. user id
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() } // Mongoose ObjectId converted to string

});

const Message = mongoose.model('Message', messageSchema);

module.exports = { Message, messageSchema };
