var mongoose = require('mongoose');
var UsersSchema = new mongoose.Schema({
  name: String,
  actions: String,
  workspace: String
});

module.exports = mongoose.model('Users', UsersSchema);