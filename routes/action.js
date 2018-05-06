var express = require('express');
var router = express.Router();
var action = require("../controllers/ActionController.js");

// Get all actions
router.get('/', action.list);

// create action
router.post('/create', action.create);

router.get('/create', function(req, res, next) {
	res.render('actions/create');
});

// Edit action
router.get('/edit/:id', function(req, res) {
  action.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  action.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  action.delete(req, res);
});

module.exports = router;