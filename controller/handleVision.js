const devGroupId = process.env.DEV_GROUP_ID.toString();
const efferianGroupId = process.env.EFFERIAN_GROUP_ID.toString();
const vision = require('../vision');

const handleVision = async (client, event, imageName) => {
    const { replyToken, source: { groupId }, message: { id } } = event;
    if (groupId === devGroupId || groupId === efferianGroupId) {
        const [result] = await vision.webDetection(`gs://eff_temp/${imageName}`);
        const webDetection = result.webDetection;
        if (webDetection.fullMatchingImages.length) {
            return client.replyMessage(replyToken, {
                type: 'text',
                text: 'top efferian moment: ' + webDetection.fullMatchingImages.map((x, y) => {
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
    }
    return Promise.resolve(null);
}

module.exports = handleVision;
