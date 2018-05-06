var express = require('express');
var router = express.Router();
var workspace = require("../controllers/index.js");


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Bora' });
});

router.get('/', function(req, res) {
  workspace.list(req, res);
});

router.post('/save/', function(req, res) {
  workspace.save(req, res);
});



module.exports = router;