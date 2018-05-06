var mongoose = require("mongoose");
var Action = require("../models/Action");
var actionController = {};


//read list off Actions
actionController.list = function(req, res) {
  Action.find({}).exec(function (err, actions) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(actions);
      res.render("../views/actionView", {actions: actions});
    }
  });
};

actionController.save = function(req, res) {
  var action = new Action(req.body);
  action.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/actionView");
    } else {
      console.log("Successfully created an action.");
      res.redirect("../actions");
    }
  });
};

actionController.edit = function(req, res) {
  Action.updateOne({actions_name: req.body.actions_name}, req.body, function (err, actions) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(res);
      res.redirect("../actions");
    }
  });
};



module.exports = actionController;