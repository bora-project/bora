var mongoose = require("mongoose");
var Users = require("../models/Users");
var Actions = require("../models/Users");
var userController = {};

userController.list = function(req, res) {
  Users.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/index", {users: users});
    }
  });
};

userController.create = function(req, res) {
  var params = {
                  "name": req.body["name"],
                  "slack_id": "",
                  "actions": [],
                  "workspace": ""
                }

  var newUsers = new Users(params);

  newUsers.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully created an user!");
    }
  });
};

// Edit an user
userController.edit = function(req, res) {
  Users.findOne({_id: req.params.id}).exec(function (err, user) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/users/edit", {user: user});
    }
  });
};

// Update an user
userController.update = function(req, res) {
  console.log(req.body)
  if (req.body["ranked"] == "on") {
    req.body["ranked"] = true;
  }
  else {
    req.body["ranked"] = false;
  }
  Users.findByIdAndUpdate(req.params.id, { $set: { ranked: req.body.ranked }}, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("../views/users/edit/" + String(req.params.id), {user: req.body});
    }
    res.redirect("../");
  });
};

userController.delete = function(req, res) {
  Users.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("user deleted!");
      res.redirect("../");
    }
  });
};

module.exports = userController;