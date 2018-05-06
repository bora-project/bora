var mongoose = require('mongoose');
var ActionsSchema = new mongoose.Schema({
  actions_name: String,
  users: String,
  ranking: Boolean
});

module.exports = mongoose.model('Actions', ActionsSchema);