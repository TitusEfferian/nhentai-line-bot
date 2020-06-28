const randomEndPoint = process.env.NHENTAI_RANDOM_ENDPOINT.toString();
const nhentaiByPassOriginal = process.env.NHENTAI_BYPASS_ORIGINAL.toString();
const nhentaiFullReader = process.env.NHENTAI_FULL_READER.toString();

const handleRandomNhentai = async (client, replyToken) => {
    try {
        const hitRandomEndPoint = await fetch(randomEndPoint);
        const parseRandomEndPoint = await hitRandomEndPoint.json();
        const success = parseRandomEndPoint.success;
        const getRandomTag = parseRandomEndPoint.data.id;
        const previewImg = parseRandomEndPoint.data.preview;
        if (success) {
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
                        "columns": [
                            {
                                "imageUrl": `${nhentaiByPassOriginal}?source=${previewImg}`,
                                "action": {
                                    "type": "uri",
                                    "label": getRandomTag,
                                    "uri": `${nhentaiFullReader}?source=${getRandomTag.split('/')[1]}`,
                                }
                            }
                        ],
                    },
                    "quickReply": {
                        "items": [
                            {
                                "type": "action",
                                "action": {
                                    "type": "message",
                                    "label": "nhentai random",
                                    "text": "nhentai random",
                                }
                            }
                        ]
                    }
                }
            ]);
        }
        return client.replyMessage(replyToken, {
            type: 'text',
            text: 'error endpoint random'
        });
    } catch (err) {
        return client.replyMessage(replyToken, {
            type: 'text',
            text: JSON.stringify(err),
        });
    }
}

module.exports = handleRandomNhentai;
