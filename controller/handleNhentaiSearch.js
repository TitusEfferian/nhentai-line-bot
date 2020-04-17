const fetch = require('isomorphic-unfetch');

const nhentaiSearchBypass = process.env.NHENTAI_SEARCH_BYPASS.toString();
const nhentaiSearchCrawler = process.env.NHENTAI_SEARCH_CRAWLER.toString();

const handleNhentaiSearch = async (searhParams, client, replyToken) => {
    const fetchSearchCrawler = await fetch(nhentaiSearchCrawler + '?search=suguha');
    const searchResult = await fetchSearchCrawler.json();
    const arrayOfResult = searchResult.arrayOfResult;
    const arrayOfColumns = [];
    for (let a = 1; a < arrayOfResult.length > 10 ? 10 : arrayOfResult.length; a++) {
        arrayOfColumns.push(
            {
                "imageUrl": nhentaiSearchBypass + "?url=" + arrayOfResult[a - 1].preview,
                "action": {
                    "type": "uri",
                    "label": arrayOfResult[a - 1].nhentai_id,
                    "uri": "https://google.com",
                }
            }
        )
    }
    return client.replyMessage(replyToken, {
        "type": "template",
        "altText": "nhentai resulte",
        "template": {
            "type": "image_carousel",
            "columns": arrayOfColumns,
        }
    });
};

module.exports = handleNhentaiSearch;