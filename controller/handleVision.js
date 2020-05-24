const vision = require('../vision');
const handleVision = async (client, event, imageName) => {
    const { replyToken, source: { groupId }, message: { id } } = event;

    const [result] = await vision.webDetection(`gs://eff_temp/${imageName}`);
    const webDetection = result.webDetection;
    if (webDetection.fullMatchingImages.length) {

        return client.replyMessage(replyToken, {
            type: 'text',
            text: webDetection.fullMatchingImages[0].url,
        });
        // webDetection.fullMatchingImages.forEach(image => {
        //     console.log(`  URL: ${image.url}`);
        //     console.log(`  Score: ${image.score}`);
        // });
    }

}

module.exports = handleVision;
