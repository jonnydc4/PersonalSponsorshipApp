const mongoose = require('mongoose');
const messageSchema = require('./Message');


const messageRoomSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    influencer: {
        type: String,
        required: true
    },
    messages: [messageSchema] // Embedded array of Message documents
});

module.exports = mongoose.model('MessageRoom', messageRoomSchema);
