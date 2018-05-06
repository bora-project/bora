var mongoose = require("mongoose");
var Workspace = require("../models/Index");
var workspaceController = {};


//read list off workspaces
workspaceController.list = function(req, res) {
  Workspace.find({}).exec(function (err, workspaces) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/home_page", {workspaces: workspaces});
    }
  });
};

workspaceController.save = function(req, res) {
  var workspace = new Workspace(req.body);

  workspace.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/home_page");
    } else {
      console.log("Successfully created an workspace.");
      res.redirect("../");
    }
  });
};

module.exports = workspaceController;