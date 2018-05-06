var express = require('express');
var router = express.Router();

/* Respond Slack with challenge paramenter. */
router.post('/challenge', function (req, res, next) {
  res.status(200);
  res.send(req.body.challenge);
});

module.exports = router;