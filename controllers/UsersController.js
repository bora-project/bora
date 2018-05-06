var mongoose = require("mongoose");
var Users = require("../models/Users");
var usersController = {};


//read list off Users
usersController.list = function(req, res) {
  Users.find({}).exec(function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/usersView", {users: users});
    }
  });
};

usersController.save = function(req, res) {
  var users = new Users(req.body);
  users.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/usersView");
    } else {
      console.log("Successfully created an action.");
      res.redirect("../users");
    }
  });
};

usersController.edit = function(req, res) {
  Users.updateOne({name: req.body.name}, req.body, function (err, users) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(res);
      res.redirect("../users");
    }
  });
};



module.exports = usersController;