const express = require('express');
const line = require('@line/bot-sdk');

const handleAddToDatabase = require('./controller/handleAddToDatabase');

const config = {
    channelAccessToken: process.env.ACCESS_TOKEN.toString(),
    channelSecret: process.env.CHANNEL_SECRET.toString(),
};

const app = express();

const client = new line.Client(config);

const handleEvent = (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    /**
     * handle all text case
     */
    if (event.message.type === 'text') {
        if (event.message.text.toLowerCase().includes('efferian')) {
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'efferian detected, database counter + 1',
            });
        }
        if(event.message.text.toLowerCase().includes('/add')) {
            handleAddToDatabase();
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'success add to database',
            });
        } 
    }

    return Promise.resolve(null);
}

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('webhook on port', port);
});
