var mongoose = require("mongoose");
var Event = require("../models/Event");
var message = require("../business/messageParser");
var eventController = {};
var usersController = require("../controllers/UsersController.js");

eventController.list = function(req, res) {
  Event.find({}).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(events);
      res.render("../views/events/index", {events: events});
    }
  });
};

eventController.create = function(req, res) {
  eventController.create_internal(req.body.message, req.session.current_user);
};

eventController.create_internal = function(msg, user) {
  var params = message.parse(msg);
  // var owner = Users.find({"slack_id": user});
  // console.log(params);
  params["owner"] = user;

  var newEvent = new Event(params);

  newEvent.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an event!");
    }
  });

  // usersController.updateEvents(params["owner"], newEvent._id);

  console.log(params);
};

// Edit an event
eventController.edit = function(req, res) {
  Event.findOne({_id: req.params.id}).exec(function (err, event) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/events/edit", {event: event});
    }
  });
};

// Update an event
eventController.update = function(req, res) {
  Event.findByIdAndUpdate(req.params.id, { $set: { action: req.body.action, date: req.body.date, time: req.body.time, txt: req.body.txt }}, { new: true }, function (err, event) {
    if (err) {
      console.log(err);
      res.render("../views/events/edit", {event: req.body});
    }
    res.redirect("../");
  });
};

eventController.delete = function(req, res) {
  Event.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("event deleted!");
      res.redirect("/home");
    }
  });
};

module.exports = eventController;