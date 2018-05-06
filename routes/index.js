var express = require('express');
var router = express.Router();
var workspace = require("../controllers/index.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bora' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Bora' });
});

router.post('/save/', function(req, res) {
  workspace.save(req, res);
});



module.exports = router;
