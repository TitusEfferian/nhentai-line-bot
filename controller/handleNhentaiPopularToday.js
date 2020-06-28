const fetch = require('isomorphic-unfetch');

const handleNhentaiPopularToday = async (client, replyToken) => {
    return client.replyMessage(replyToken, {
        type: 'text',
        text: 'on development',
    })
};

module.exports = handleNhentaiPopularToday;
