var mongoose = require('mongoose');
var ActionsSchema = new mongoose.Schema({
  name: String,
  users: Array,
  ranking: Array,
  ranked: Boolean,
});

module.exports = mongoose.model('Actions', ActionsSchema);