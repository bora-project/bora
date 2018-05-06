var express = require('express');
var router = express.Router();
var users = require("../controllers/UsersController.js");

router.get('/', function(req, res) {
  users.list(req, res);
});

router.post('/save', function(req, res) {
  users.save(req, res);
});

router.post('/edit', function(req, res) {
  users.edit(req, res);
});

module.exports = router;