const fetch = require('isomorphic-unfetch');
const storageEndpoint = process.env.NHENTAI_STORAGE.toString();
const devGroupId = process.env.DEV_GROUP_ID.toString();

const handleStoreImage = async (client, event) => {
    const { replyToken, source: { groupId }, message: { id } } = event;
    if (groupId === devGroupId) {
        try {
            const fetchResult = await fetch(`${storageEndpoint}?messageId=${id}`);
            const { success } = await fetchResult.json();

            if (!success) {
                return client.replyMessage(replyToken, {
                    type: 'text',
                    text: 'dev done fail',
                });
            }
            return client.replyMessage(replyToken, {
                type: 'text',
                text: 'dev done success',
            });
        } catch (err) {
            return client.replyMessage(replyToken, {
                type: 'text',
                text: 'dev done failed'
            })
        }
    }
};

module.exports = handleStoreImage;
