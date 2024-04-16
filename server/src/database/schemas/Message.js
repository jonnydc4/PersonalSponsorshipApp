const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now }, // Uses the current date and time
    sender: { type: String, required: true } // Identifier for sender type
});

module.exports = messageSchema;
