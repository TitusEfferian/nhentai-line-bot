const handleHelpMessage = async (client, replyToken) => {
    return client.replyMessage(replyToken, {
        "type": "text",
        "text": "nhentai unofficial commands example",
        "quickReply": {
            "items": [
                {
                    "type": "action",
                    "action": {
                        "type": "message",
                        "label": "nhentai reader",
                        "text": 'g/310084',
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "message",
                        "label": "nhentai search",
                        "text": "nhentai suguha"
                    }
                },
                {
                    "type": "action",
                    "action": {
                        "type": "message",
                        "label": "nhentai random",
                        "text": "nhentai random"
                    }
                },
                // {
                //     "type": "action",
                //     "action": {
                //         "type": "message",
                //         "label": "sauce",
                //         "text": "sauce"
                //     }
                // },
                {
                    "type": "action",
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
