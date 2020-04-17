const fetch = require('isomorphic-unfetch');

const handleNhentaiSearch = async (searhParams, client, replyToken) => {
    const fetchSearchCrawler = await fetch('https://asia-east2-fleet-range-273715.cloudfunctions.net/nhentai-search?search=suguha');
    const searchResult = await fetchSearchCrawler.json();
    const success = searchResult.success;
    return client.replyMessage(replyToken, {
        type: 'text',
        text: success.toString(),
    });
};

module.exports = handleNhentaiSearch;