var express = require('express');
var router = express.Router();
var users = require("../controllers/UsersController.js");
var actions = require("../controllers/ActionController.js");

// Get all userss
router.get('/', users.list);

// create users
router.post('/create', users.create);

router.get('/create', function(req, res, next) {
	var data = actions.search();
	res.render('users/create', { actions: data });
});

// Edit users
router.get('/edit/:id', function(req, res) {
  users.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  users.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  users.delete(req, res);
});

router.get('/interests/edit', function(req, res) {
  users.interestsList(req, res);
});

module.exports = router;