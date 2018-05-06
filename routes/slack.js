var express = require('express');
var router = express.Router();

/* Respond Slack with challenge paramenter. */
router.post('/challenge', function (req, res, next) {
  if (req.body.token != process.env.VERIFICATION_TOKEN) {
    res.status(401);
    res.send('Invalid token');
    return;
  }
  
  res.status(200);
  res.send(req.body.challenge);
});

const create_slack_event_adapter = require('@slack/events-api').createSlackEventAdapter;
const slack_events = create_slack_event_adapter(process.env.VERIFICATION_TOKEN);
router.use('/event', slack_events.expressMiddleware());
slack_events.on('message', function(event){
  console.log('Bora recebeu uma mensagem: de @${event.user} em #${event.channel}');
  console.log('>>> ${event.text}');
})

module.exports = router;