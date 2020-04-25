const express = require('express');
const line = require('@line/bot-sdk');
const fetch = require('isomorphic-unfetch');

const handleCountEfferianPoints = require('./controller/handleCountEfferianPoints');
const handleGetTopPlayer = require('./controller/handleGetTopPlayer');
const handleNhentaiSearch = require('./controller/handleNhentaiSearch');
const handleNhentaiInfo = require('./controller/handleNhentaiInfo');
const handleTestDb = require('./controller/handleTestDb');
const handleRamadhanTime = require('./controller/handleRamadhanTime');
const handleHelpMessage = require('./controller/handleHelpMessage');
const handleFlexMessage = require('./controller/handleFlexMessage');

const config = {
    channelAccessToken: process.env.ACCESS_TOKEN.toString(),
    channelSecret: process.env.CHANNEL_SECRET.toString(),
};

const nhentaiCrawler = process.env.NHENTAI_CRAWLER.toString();
const nhentaiByPass = process.env.NHENTAI_BYPASS.toString();
const nhentaiByPassOriginal = process.env.NHENTAI_BYPASS_ORIGINAL.toString();

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
        }if (event.message.text.toLowerCase().startsWith('!help') || event.message.text.toLowerCase() === 'help') {
            handleHelpMessage(client, event.replyToken);
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
            (async () => {
                /**
                 * handle ramadhan block from group
                 */
                const isFromGroup = event.source.type === 'group';
                if (isFromGroup && handleRamadhanTime()) {
                    return client.replyMessage(event.replyToken, {
                        "type": "text",
                        "text": 'demi menghormati bulan suci ramadhan, bot nhentai akan menerima request diluar jam puasa hanya pada chat personal\n\ngroup chat akan aktif kembali ketika sudah berbuka puasa'
                    });
                }
                /**
                 * end of ramadhan block request
                 */
                const nhentaiCode = event.message.text.toLowerCase().split('/')[1];
                const arrayOfColumns = [];
                const arrayOfReply = [];
                const resultFetchBeforeParse = await fetch(nhentaiCrawler + '?nhentaiId=' + nhentaiCode);
                const resultFetch = await resultFetchBeforeParse.json();
                const arrayOfImage = resultFetch.arrayOfImage;
                const totalPage = arrayOfImage.length;

                if (totalPage === 0) {
                    return client.replyMessage(event.replyToken, {
                        type: 'text',
                        text: nhentaiCode + ' not found',
                    })
                }
                const numberOfReplies = () => {
                    if (totalPage > 50) {
                        return 5;
                    }
                    return totalPage % 10 === 0 ? totalPage / 10 : Math.floor(totalPage / 10) + 1;
                };
                for (let a = 1; a <= totalPage; a++) {
                    arrayOfColumns.push({
                        "imageUrl": nhentaiByPass + "?bucketId=" + arrayOfImage[0].bucket_id + "&nhenPage=" + a,
                        "action": {
                            "type": "uri",
                            "label": a,
                            /**
                             * experiment performance load
                             */
                            // "uri": "https://cult.fajar.co/" + nhentaiCode + "/" + a,
                            "uri": nhentaiByPassOriginal + "?bucketId="+arrayOfImage[0].bucket_id+"&nhenPage=" + a,
                        }
                    });
                }
                for (let a = 1; a <= numberOfReplies(); a++) {
                    arrayOfReply.push({
                        "type": "template",
                        "altText": "nhentai g/" + nhentaiCode,
                        "template": {
                            "type": "image_carousel",
                            "columns": arrayOfColumns.filter((x, y) => {
                                if (a === 1) {
                                    return y >= 0 && y <= 9;
                                } else if (a === 2) {
                                    return y >= 10 && y <= 19;
                                } else if (a === 3) {
                                    return y >= 20 && y <= 29;
                                } else if (a === 4) {
                                    return y >= 30 && y <= 39;
                                } else if (a === 5) {
                                    return y >= 40 && y <= 49;
                                }
                                return;
                            }),
                        }
                    })
                }
                return client.replyMessage(event.replyToken, arrayOfReply);
            })();
        }
        if(event.message.text.toLowerCase().startsWith('nhentai')) {
            (async () => {
                /**
                 * handle ramadhan block from group
                 */
                const isFromGroup = event.source.type === 'group';
                if (isFromGroup && handleRamadhanTime()) {
                    return client.replyMessage(event.replyToken, {
                        "type": "text",
                        "text": 'demi menghormati bulan suci ramadhan, bot nhentai akan menerima request diluar jam puasa hanya pada chat personal\n\ngroup chat akan aktif kembali ketika sudah berbuka puasa'
                    });
                }
                /**
                 * end of ramadhan block request
                 */
                const searchKeywords = event.message.text.toLowerCase().split('nhentai ')[1];
                await handleNhentaiSearch(searchKeywords, client, event.replyToken);
            })();
        }
        if(event.message.text.toLowerCase().startsWith('!nhentaiinfo')) {
            (async () => {
                const nhentaiCode = event.message.text.toLowerCase().split('!nhentaiinfo ')[1];
                await handleNhentaiInfo(nhentaiCode,client,event.replyToken);
            })();
        }
        if(event.message.text.toLowerCase().startsWith('dev flex')) {
            handleFlexMessage(client, event.replyToken);
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
