var express = require('express');
var router = express.Router();
var action = require("../controllers/ActionController.js");

router.get('/', function(req, res) {
  action.list(req, res);
});

router.post('/save', function(req, res) {
  action.save(req, res);
});

router.post('/edit', function(req, res) {
  action.edit(req, res);
});

module.exports = router;