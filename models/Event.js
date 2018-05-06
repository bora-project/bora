var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  action: String,
  date: String,
  time: String,
  txt: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', EventSchema);