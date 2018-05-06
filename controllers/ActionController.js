var mongoose = require("mongoose");
var Action = require("../models/Action");
var actionController = {};

actionController.list = function(req, res) {
  Action.find({}).exec(function (err, actions) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/actions/index", {actions: actions});
    }
  });
};

actionController.search = function(req, res) {
  Action.find({}).exec(function (err, actions) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/myactions", {actions: actions, userid: req.params.id});
    }
  });
};

actionController.create = function(req, res) {
  if (req.body["ranked"] == "on") {
    req.body["ranked"] = true;
  }
  else {
    req.body["ranked"] = false;
  }
  
  var params = {
                  "name": req.body["name"],
                  "users": [],
                  "ranking": [],
                  "ranked": req.body["ranked"]
                }

  var newAction = new Action(params);

  newAction.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an action!");
    }
  });
};

// Edit an action
actionController.edit = function(req, res) {
  Action.findOne({_id: req.params.id}).exec(function (err, action) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/actions/edit", {action: action});
    }
  });
};

// Update an action
actionController.update = function(req, res) {
  console.log(req.body)
  if (req.body["ranked"] == "on") {
    req.body["ranked"] = true;
  }
  else {
    req.body["ranked"] = false;
  }
  Action.findByIdAndUpdate(req.params.id, { $set: { ranked: req.body.ranked }}, { new: true }, function (err, action) {
    if (err) {
      console.log(err);
      res.render("../views/actions/edit/" + String(req.params.id), {action: req.body});
    }
    res.redirect("../");
  });
};

actionController.delete = function(req, res) {
  Action.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("action deleted!");
      res.redirect("../");
    }
  });
};

module.exports = actionController;