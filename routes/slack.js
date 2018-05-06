var express = require('express');
var router = express.Router();

const { WebClient } = require('@slack/client');
const access_token = process.env.SLACK_OAUTH_ACCESS_TOKEN;
const web = new WebClient(access_token);

const create_slack_event_adapter = require('@slack/events-api').createSlackEventAdapter;
const slack_events = create_slack_event_adapter(process.env.SLACK_VERIFICATION_TOKEN);

router.post('/event_api', slack_events.expressMiddleware());

slack_events.on('message', function(event){
  console.log(`Bora recebeu uma mensagem: de @${event.user} em #${event.channel}`);
  console.log(`>>> ${event.text}`);
});

module.exports = router;