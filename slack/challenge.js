var express = require('express');
var router = express.Router();

router.post('/challenge', function (req, res, next) {
  res.status(200);
  res.send(req.body.challenge);
});

module.exports = router;