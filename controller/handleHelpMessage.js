const randomEndPoint = process.env.RANDOM_ENDPOINT.toString();
const handleHelpMessage = async (client, replyToken) => {
    const hitRandomEndPoint = await fetch(randomEndPoint);
    const parseRandomEndPoint = await hitRandomEndPoint.json();
    const getRandomTag = parseRandomEndPoint.data;

    const iconUrl = 'https://b2.crackwatch.com/file/crackwatch-temp/i2vhbw89a.jpg';
    return client.replyMessage(replyToken, {
        "type": "text",
        "text": "nhentai unofficial commands example",
        "quickReply": {
            "items": [
                {
                    "type": "action",
                    "imageUrl": iconUrl,
                    "action": {
                        "type": "message",
                        "label": "nhentai reader",
                        "text": getRandomTag,
                    }
                },
                {
                    "type": "action",
                    "imageUrl": iconUrl,
                    "action": {
                        "type": "message",
                        "label": "nhentai search",
                        "text": "nhentai suguha"
                    }
                },
                {
                    "type": "action",
                    "imageUrl": iconUrl,
                    "action": {
                        "type": "message",
                        "label": "nhentai info",
                        "text": "!nhentaiinfo 310084"
                    }
                }
            ]
        }
    })
}

module.exports = handleHelpMessage;
