var express = require('express');
var router = express.Router();

/* Respond Slack with challenge paramenter. */
router.post('/challenge', function (req, res, next) {
  if (req.body.token != process.env.VERIFICATION_TOKEN) {
    return;
  }

  if (req.body.challenge !== undefined) {
    res.status(200);
    res.send(req.body.challenge);
    return;
  }

  next();
});

const create_slack_event_adapter = require('@slack/events-api').createSlackEventAdapter;
const slack_events = create_slack_event_adapter(process.env.VERIFICATION_TOKEN);

router.post('/challenge', slack_events.expressMiddleware());

slack_events.on('message', function(event){
  console.log(`Bora recebeu uma mensagem: de @${event.user} em #${event.channel}`);
  console.log(`>>> ${event.text}`);
})

module.exports = router;