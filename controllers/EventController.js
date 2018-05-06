var mongoose = require("mongoose");
var Event = require("../models/Event");
var message = require("../business/messageParser");
var eventController = {};

// eventController.create = function(req, res) {
//   res.render("../views/_messageBox");
// };

eventController.create = function(req, res) {
  // console.log(req.body.message);

  var params = message.parse(req.body.message);

  var newEvent = new Event(params);

  newEvent.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an event!");
    }
  });


  console.log(params);
};

// eventController.delete = function(req, res) {
//   event.remove({_id: req.params.id}, function(err) {
//     if(err) {
//       console.log(err);
//     }
//     else {
//       console.log("event deleted!");
//       res.redirect("/events");
//     }
//   });
// };

module.exports = eventController;