const fetch = require('isomorphic-unfetch');

const handleNhentaiPopularToday = async (client, replyToken) => {
    try {
        const resultPopular = await fetch('https://asia-east2-fleet-range-273715.cloudfunctions.net/popular-now');
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
