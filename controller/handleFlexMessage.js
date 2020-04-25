const handleFlexMessage = (client, replyToken) => {
    return client.replyMessage(replyToken,
        {
            "type": "flex",
            "altText": "this is a flex message",
            "contents": {
                "type": "bubble",
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "hello"
                        },
                        {
                            "type": "text",
                            "text": "world"
                        }
                    ]
                }
            }
        }
    )
}