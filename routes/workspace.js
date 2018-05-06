var express = require('express');
var router = express.Router();
var workspace = require("../controllers/WorkspaceController.js");

router.get('/', function(req, res) {
  workspace.list(req, res);
});

router.post('/save', function(req, res) {
  workspace.save(req, res);
});

router.post('/edit', function(req, res) {
  workspace.edit(req, res);
});

module.exports = router;