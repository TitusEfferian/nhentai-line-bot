const devGroupId = process.env.DEV_GROUP_ID.toString();
const efferianGroupId = process.env.EFFERIAN_GROUP_ID.toString();
const vision = require('../vision');

const handleVision = async (client, event, imageName) => {
    const { replyToken, source: { groupId, type }, message: { id } } = event;
    if (type === 'group') {
        if (groupId === devGroupId || groupId === efferianGroupId) {
            try {
                const [result] = await vision.webDetection(`gs://eff_temp/${imageName}`);
                const webDetection = result.webDetection;
                if (webDetection.fullMatchingImages.length) {
                    return client.replyMessage(replyToken, {
                        type: 'text',
                        text: 'vision: ' + webDetection.fullMatchingImages.map((x, y) => {
                            return '\n' + (y + 1) + '. ' + x.url;
                        }),
                    });
                }
                if (!webDetection.fullMatchingImages.length) {
                    return client.replyMessage(replyToken, {
                        type: 'text',
                        text: `no vision detected`,
                    });
                }
            } catch (err) {
                return client.replyMessage(replyToken, {
                    type: 'text',
                    text: err ? err : 'temporary image sudah dihapus',
                })
            }
        }
    }
    return Promise.resolve(null);
}

module.exports = handleVision;
