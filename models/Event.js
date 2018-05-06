var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  name: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);