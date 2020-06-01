const randomEndPoint = process.env.NHENTAI_RANDOM_ENDPOINT.toString();
const nhentaiSearchBypass = process.env.NHENTAI_SEARCH_BYPASS.toString();
const nhentaiByPassOriginal = process.env.NHENTAI_BYPASS_ORIGINAL.toString();
const nhentaiFullReader = process.env.NHENTAI_FULL_READER.toString();

const handleRandomNhentai = async (client, replyToken) => {
    const hitRandomEndPoint = await fetch(randomEndPoint);
    const parseRandomEndPoint = await hitRandomEndPoint.json();
    const getRandomTag = parseRandomEndPoint.data.id;
    const previewImg = parseRandomEndPoint.data.preview;
    return client.replyMessage(replyToken, [
        {
            "type": "text",
            "text": "klik gambar untuk melihat seluruh halaman",
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
            }
        }
    ]);
    // return client.replyMessage(replyToken,
    //     {
    //         "type": "flex",
    //         "altText": "nhentai random",
    //         "contents": {
    //             "type": "carousel",
    //             "contents": [
    //                 {
    //                     "type": "bubble",
    //                     "size": "kilo",
    //                     "body": {
    //                         "type": "box",
    //                         "layout": "vertical",
    //                         "contents": [
    //                             {
    //                                 "type": "image",
    //                                 "url": `${nhentaiByPassOriginal}?source=${previewImg}`,
    //                                 "size": "full",
    //                                 "aspectMode": "cover",
    //                                 "gravity": "top",
    //                                 "aspectRatio": "2:3",
    //                                 "margin": "none"
    //                             },
    //                             {
    //                                 "type": "box",
    //                                 "layout": "vertical",
    //                                 "contents": [
    //                                     {
    //                                         "type": "text",
    //                                         "text": getRandomTag,
    //                                         "color": "#ffffff",
    //                                         "align": "center"
    //                                     }
    //                                 ],
    //                                 "position": "absolute",
    //                                 "offsetBottom": "0px",
    //                                 "offsetStart": "0px",
    //                                 "offsetEnd": "0px",
    //                                 "backgroundColor": "#ed2553",
    //                                 "paddingAll": "20px"
    //                             }
    //                         ],
    //                         "paddingAll": "0px"
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // )
}

module.exports = handleRandomNhentai;