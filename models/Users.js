var mongoose = require('mongoose');
var UsersSchema = new mongoose.Schema({
  name: String,
  slack_id: String,
  actions: Array,
  workspace: String
});

module.exports = mongoose.model('Users', UsersSchema);