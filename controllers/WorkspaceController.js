var mongoose = require("mongoose");
var Workspace = require("../models/Workspace");
var workspaceController = {};


//read list off workspace
workspaceController.list = function(req, res) {
  Workspace.find({}).exec(function (err, workspaces) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/workspaceView", {workspaces: workspaces});
    }
  });
};

workspaceController.save = function(req, res) {
  var workspace = new Workspace(req.body);
  workspace.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/workspaceView");
    } else {
      console.log("Successfully created an action.");
      res.redirect("../workspace");
    }
  });
};

workspaceController.edit = function(req, res) {
  Workspace.updateOne({name: req.body.name}, req.body, function (err, workspace) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      console.log(res);
      res.redirect("../workspace");
    }
  });
};



module.exports = workspaceController;