
const mongoose = require('mongoose');
const { messageSchema } = require('./Message');


const messageRoomSchema = new mongoose.Schema({
    user1Id: {
        type: String,
        required: true
    },
    user2Id: {
        type: String,
        required: true
    },
    user1Name: {
        type: String,
        required: true
    },
    user2Name: {
        type: String,
        required: true
    },

    messages: [messageSchema] // Embedded array of Message documents
});

module.exports = mongoose.model('MessageRoom', messageRoomSchema);
