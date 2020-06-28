const fetch = require('isomorphic-unfetch');

const nhentaiPopularToday = process.env.NHENTAI_POPULAR_TODAY.toString();

const handleNhentaiPopularToday = async (client, replyToken) => {
    try {
        const resultPopular = await fetch(nhentaiPopularToday);
        const { success, arrayOfResult } = await resultPopular.json();
        if (success) {
            return client.replyMessage(replyToken, {
                type: 'text',
                text: String(success),
            })
        }
        return client.replyMessage(replyToken, {
            type: 'text',
            text: 'success false',
        })
    } catch (err) {
        return client.replyMessage(replyToken, {
            type: 'text',
            text: JSON.stringify(err),
        })
    }

};

module.exports = handleNhentaiPopularToday;
