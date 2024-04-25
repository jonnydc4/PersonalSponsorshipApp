const mongoose = require('mongoose');
const messageSchema = require('./Message');


const messageRoomSchema = new mongoose.Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    messages: [messageSchema] // Embedded array of Message documents
});

module.exports = mongoose.model('MessageRoom', messageRoomSchema);
