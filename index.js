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
        console.log(event);
        if (event.message.text.toLowerCase().startsWith('!usage')) {
            return client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Jika menemukan orang yang efferian moment, gunakan command berikut:\n!efferian [@nama orang]\ncontoh: !efferian @vergi-lunas
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
                text: 'top efferian moment: ' + topPlayerData.map((x, y) => {
                    return '\n' + (y + 1) + '. ' + x.username + ': ' + x.efferian_points + ' points';
                }),
            });
            const callBackReturnNoData = () => client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'belum ada data di leaderboard',
            });
            const callBackReturnCatchError = (err) => client.replyMessage(event.replyToken, {
                type: 'text',
                text: 'error server: ' + JSON.stringify(err),
            });
            handleGetTopPlayer(callBackReturnWithData, callBackReturnNoData, callBackReturnCatchError);
        }
        if (event.message.text.toLowerCase().startsWith('g/')) {
            return client.replyMessage(event.replyToken,
                {
                    "type": "template",
                    "altText": "nhentai g/12345 test",
                    "template": {
                        "type": "image_carousel",
                        "columns": [
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/1t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/1.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/2t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/2.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/3t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/3.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/4t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/4.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/5t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/5.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/6t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/6.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/7t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/7.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/8t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/8.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/9t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/9.jpg"
                                }
                            },
                            {
                                "imageUrl": "https://t.nhentai.net/galleries/1609198/10t.jpg",
                                "action": {
                                    "type": "uri",
                                    "label": "cover",
                                    "uri": "https://i.nhentai.net/galleries/1609198/10.jpg"
                                }
                            },
                        ]
                    }
                }
            );
        }
    }
    return Promise.resolve(null);
}

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch(err => {
            console.error({
                errorRoutesWebHook: err,
            })
        });
});

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//     console.log('webhook on port', port);
// });

exports.webhook = app;
