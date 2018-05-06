var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all employees
router.get('/', event.list);

// Save employee
router.post('/create', event.create);
router.get('/create', function(req, res, next) {
	res.render('_messageBox');
});

module.exports = router;