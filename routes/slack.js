var express = require('express');
var router = express.Router();
var eventController = require("../controllers/EventController.js");

const { WebClient } = require('@slack/client');
const access_token = process.env.SLACK_OAUTH_ACCESS_TOKEN;
const web = new WebClient(access_token);

const create_slack_event_adapter = require('@slack/events-api').createSlackEventAdapter;
const slack_events = create_slack_event_adapter(process.env.SLACK_VERIFICATION_TOKEN);

router.post('/event_api', slack_events.expressMiddleware());
router.get('/redirect', function(req, res, next) {
  var code = req.query.code;
  var client_id = process.env.CLIENT_ID;
  var client_secret = process.env.CLIENT_SECRET;
  var redirect_url = '/slack/redirect';

  web.oauth.access({ code: code, client_id: client_id, client_secret: client_secret })
  .then((result) => {
    if (result.access_token == process.env.SLACK_OAUTH_ACCESS_TOKEN) {
      req.session.user_logged = true; // GENERATE_HASH_TOKEN
      res.redirect('/home');
    } else {
      res.redirect('/');
    }
  })
  .catch(console.error);
});

bora_answers = function(event, message) {
  web.chat.postMessage({ as_user: false, channel: event.channel, text: `Bora lá, <@${event.user}>` })
  .then((res) => {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);

  eventController.create_internal(message);
};

slack_events.on('app_mention', function(event) {
  var message = event.text;
  message = message.split(" ");
  message[0] = "";
  message = message.join(" ").trim();

  bora_answers(event, message);
});

slack_events.on('message', function(event){
  if (event.user === undefined)
    return;

  if (event.text.split(" ")[0].toLowerCase() != 'bora')
    return;

  bora_answers(event, event.text);
});

module.exports = router;