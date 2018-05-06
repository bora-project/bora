var express = require('express');
var router = express.Router();
var workspace = require("../controllers/index.js");
var action = require("../controllers/ActionController.js");
var event = require("../controllers/EventController.js");
var Event = require("../models/Event");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_logged) {
    res.redirect('/home');
    return;
  }
  res.render('index', { title: 'Bora' });
});

router.get('/home', function(req, res, next) {
  Event.find({}).exec(function (err, events) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/home", {events: events, title: 'Bora', current_user: req.session.current_user });
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.user_logged = undefined;
  res.redirect('/');
});

module.exports = router;
