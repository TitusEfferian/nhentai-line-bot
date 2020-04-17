const fetch = require('isomorphic-unfetch');

const nhentaiSearchBypass = process.env.NHENTAI_SEARCH_BYPASS.toString();
const nhentaiSearchCrawler = process.env.NHENTAI_SEARCH_CRAWLER.toString();

const handleNhentaiSearch = async (searhParams, client, replyToken) => {
    const searchSanitize = searhParams.replace(' ', '%20');
    const fetchSearchCrawler = await fetch(nhentaiSearchCrawler + '?search=' + searchSanitize);
    const searchResult = await fetchSearchCrawler.json();
    const arrayOfResult = searchResult.arrayOfResult;
    const arrayOfColumns = [];
    if (arrayOfResult.length === 0) {
        return client.replyMessage(replyToken, {
            "type": "text",
            "text": "no result for " + searhParams,
        });
    }
    const handleValidateIncrement = () => {
        if (arrayOfResult.length > 10) {
            return 10;
        }
        return arrayOfResult.length;
    }
    for (let a = 1; a <= handleValidateIncrement(); a++) {
        arrayOfColumns.push(
            {
                "imageUrl": nhentaiSearchBypass + "?url=" + arrayOfResult[a - 1].preview,
                "action": {
                    "type": "postback",
                    "label": arrayOfResult[a - 1].nhentai_id,
                    "data": "action=buy&itemid=111",
                    "text": "Buy"
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