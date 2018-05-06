var express = require('express');
var router = express.Router();
var event = require("../controllers/EventController.js");

// Get all events
router.get('/', event.list);

// create event
router.post('/create', event.create);

router.get('/create', function(req, res, next) {
		res.render('events/_messageBox');
		res.redirect('/home');
});

// Edit event
router.get('/edit/:id', function(req, res) {
  event.edit(req, res);
});

// Edit update
router.post('/update/:id', function(req, res) {
  event.update(req, res);
});

// Edit update
router.post('/delete/:id', function(req, res, next) {
  event.delete(req, res);
});

module.exports = router;
