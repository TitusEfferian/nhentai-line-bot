const randomEndPoint = process.env.NHENTAI_RANDOM_ENDPOINT.toString();
const nhentaiSearchBypass = process.env.NHENTAI_SEARCH_BYPASS.toString();

const handleRandomNhentai = async (client, replyToken) => {
    const hitRandomEndPoint = await fetch(randomEndPoint);
    const parseRandomEndPoint = await hitRandomEndPoint.json();
    const getRandomTag = parseRandomEndPoint.data.id;
    const previewImg = parseRandomEndPoint.data.preview;
    return client.replyMessage(replyToken,
        {
            "type": "flex",
            "altText": "nhentai random",
            "contents": {
                "type": "carousel",
                "contents": [
                    {
                        "type": "bubble",
                        "size": "kilo",
                        "body": {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "image",
                                    "url": nhentaiSearchBypass + '?url=' + previewImg,
                                    "size": "full",
                                    "aspectMode": "cover",
                                    "gravity": "top",
                                    "aspectRatio": "2:3",
                                    "margin": "none"
                                },
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "text",
                                            "text": getRandomTag,
                                            "color": "#ffffff",
                                            "align": "center"
                                        }
                                    ],
                                    "position": "absolute",
                                    "offsetBottom": "0px",
                                    "offsetStart": "0px",
                                    "offsetEnd": "0px",
                                    "backgroundColor": "#ed2553",
                                    "paddingAll": "20px"
                                }
                            ],
                            "paddingAll": "0px"
                        }
                    }
                ]
            }
        }
    )
}

module.exports = handleRandomNhentai;