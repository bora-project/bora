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
                  "slack_id": req.session.current_user,
                  "actions": [],
                  "workspace": req.body["workspace"],
                  "events": []
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

// Update an user (add event)
userController.updateEvents = function(user, event_id) {
  Users.findByIdAndUpdate( user , { $push: event_id }, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.render("../views/users/edit/" + String(req.params.id), {user: req.body});
    }
    res.redirect("../");
  });
};

// Update an user
userController.updateInterests = function(req, res) {
  var actions = [];
  for (var key in req.body) {
    if (req.body[key] == "on") {
      actions.push(key);
    }
  }

  console.log(req.params);
  Users.findByIdAndUpdate(req.params.userid, { $set: { actions: actions }}, { new: true }, function (err, user) {
    if (err) {
      console.log(err);
      res.redirect("/myactions/" + redirect);
    }
    console.log(user);
    res.redirect("../../");
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