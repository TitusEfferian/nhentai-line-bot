const fetch = require('isomorphic-unfetch');

const nhentaiPopularToday = process.env.NHENTAI_POPULAR_TODAY.toString();

const handleNhentaiPopularToday = async (client, replyToken) => {
    try {
        const resultPopular = await fetch(nhentaiPopularToday);
        const { success, arrayOfResult } = await resultPopular.json();
        if (success) {
            const arrayOfColumns = arrayOfResult.map(x => {
                return {
                    "imageUrl": `${nhentaiByPassOriginal}?source=${x.preview}`,
                    "action": {
                        "type": "uri",
                        "label": x.nhentai_id,
                        "uri": `${nhentaiFullReader}?source=${x.nhentai_id.split('/')[1]}`,
                    }
                }
            })
            return client.replyMessage(replyToken, [
                {
                    type: 'text',
                    text: 'click the pictures to see full content',
                },
                {
                    "type": "template",
                    "altText": "nhentai results",
                    "template": {
                        "type": "image_carousel",
                        "columns": arrayOfColumns,
                    },
                },
            ]);
        }
        return client.replyMessage(replyToken, {
            type: 'text',
            text: 'success false',
        })
    } catch (err) {
        return client.replyMessage(replyToken, {
            type: 'text',
            text: JSON.stringify(err),
        })
    }

};

module.exports = handleNhentaiPopularToday;
