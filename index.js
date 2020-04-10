const express = require('express');
const line = require('@line/bot-sdk');

const handleCountEfferianPoints = require('./controller/handleCountEfferianPoints');
const handleGetTopPlayer = require('./controller/handleGetTopPlayer');

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
        console.log(event.message.text);
        if (event.message.text.toLowerCase().startsWith('!usage')) {
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Jika menemukan orang yang efferian moment, gunakan command berikut:
                !efferian [@nama orang]
                contoh: !efferian @vergi-lunas
                `,
            });
        }
        if (event.message.text.toLowerCase().startsWith('!efferian')) {
            const userEfferianMoment = event.message.text.toLowerCase().split('!efferian ')[1].split('@')[1];
            handleCountEfferianPoints({
                username: userEfferianMoment,
            });
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'efferian moment detected, ' + userEfferianMoment + ' point + 1',
            });
        }
        if (event.message.text.toLowerCase().startsWith('!top')) {
            const callBackReturnWithData = (topPlayerData) => client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'top efferian moment: \n' + topPlayerData.map((x, y) => {
                    return (y + 1) + '. ' + x.username + ': ' + x.efferian_points + ' points\n';
                }),
            });
            const callBackReturnNoData = () => client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'belum ada data di leaderboard',
            });
            handleGetTopPlayer(callBackReturnWithData, callBackReturnNoData);
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
