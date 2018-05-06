var mongoose = require('mongoose');
var WorkspaceSchema = new mongoose.Schema({
  name: String,
  //users: [{}],
  address: String,
  position: String,
  salary: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Workspace', WorkspaceSchema);