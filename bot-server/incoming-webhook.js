// incoming-webhook.js

module.exports = function(webserver, controller) {
    // Receive post data from slack, this will be the messages you receive 
    webserver.post('/slack/receive', function(req, res) {
        // respond to Slack that the webhook has been received.
        res.status(200);
        res.send('ok');

        var bot = controller.spawn({});

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res, bot);
    });
    // Perform the Slack webhook verification handshake with your verify token 
    webserver.get('/slack/receive', function(req, res) {
        if (req.query['hub.mode'] == 'subscribe') {
            if (req.query['hub.verify_token'] == controller.config.verify_token) {
                res.send(req.query['hub.challenge']);
            } else {
                res.send('OK');
            }
        }
    });
}