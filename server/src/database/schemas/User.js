const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
  userName: String,
  age: Number,
  email: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
