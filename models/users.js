const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  email: String,
  password: String,
  poster_path: String
});

module.exports = mongoose.model('users', usersSchema);
