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
                if (webDetection) {
                    if (webDetection.fullMatchingImages.length) {
                        return client.replyMessage(replyToken, {
                            type: 'text',
                            text: `${webDetection.fullMatchingImages.map(x=>x.url).join('\n\n')}`
                        });
                    }
                    if (!webDetection.fullMatchingImages.length) {
                        return client.replyMessage(replyToken, {
                            type: 'text',
                            text: `no vision detected`,
                        });
                    }
                }
                return client.replyMessage(replyToken, {
                    type: 'text',
                    text: 'temporary image telah dihapus',
                });
            } catch (err) {
                return client.replyMessage(replyToken, {
                    type: 'text',
                    text: JSON.stringify(err),
                })
            }
        }
    }
    return Promise.resolve(null);
}

module.exports = handleVision;
