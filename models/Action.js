var mongoose = require('mongoose');
var ActionsSchema = new mongoose.Schema({
  actions_name: String,
  users: Array,
  ranking: Boolean,
  name: String,
  users: Array,
  ranking: Array,
  ranked: Boolean,
});

module.exports = mongoose.model('Actions', ActionsSchema);