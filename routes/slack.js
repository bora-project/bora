var express = require('express');
var router = express.Router();

/* Respond Slack with challenge paramenter. */
router.post('/challenge', function (req, res, next) {
  if (req.body.token != process.env.VERIFICATION_TOKEN) {
    res.status(401);
    res.send('Invalid token');
  }
  
  res.status(200);
  res.send(req.body.challenge);
});

module.exports = router;