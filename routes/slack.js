var express = require('express');
var router = express.Router();
var eventController = require("../controllers/EventController.js");

const { WebClient } = require('@slack/client');
const access_token = process.env.SLACK_OAUTH_ACCESS_TOKEN;
const web = new WebClient(access_token);

const create_slack_event_adapter = require('@slack/events-api').createSlackEventAdapter;
const slack_events = create_slack_event_adapter(process.env.SLACK_VERIFICATION_TOKEN);

router.post('/event_api', slack_events.expressMiddleware());

bora_answers = function(event) {
  web.chat.postMessage({ as_user: false, channel: event.channel, text: `Bora lá, <@${event.user}>`})
  .then((res) => {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);

  eventController.create_internal(event.text);
};

slack_events.on('app_mention', bora_answers);

slack_events.on('message', function(event){
  if (event.user === undefined)
    return;

  if (event.text.split(" ")[0].toLowerCase() != 'bora')
    return;
  
  bora_answers(event);
});

module.exports = router;