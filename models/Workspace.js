var mongoose = require('mongoose');
var workspaceSchema = new mongoose.Schema({
  name: String,
  actions: String,
  users: String
});

module.exports = mongoose.model('Workspaces', workspaceSchema);