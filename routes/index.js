var express = require('express');
var router = express.Router();
var workspace = require("../controllers/index.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.user_logged) {
    res.redirect('/home');
    return;
  }
  res.render('index', { title: 'Bora' });
});

router.get('/home', function(req, res, next) {
  if (req.session.user_logged) {
    res.render('home', { title: 'Bora' });
    return;
  }
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.session.user_logged = undefined;
  res.redirect('/');
});

module.exports = router;
