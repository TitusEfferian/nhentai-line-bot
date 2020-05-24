const devGroupId = process.env.DEV_GROUP_ID.toString();
const efferianGroupId = process.env.EFFERIAN_GROUP_ID.toString();

const storage = require('../StorageConnector');

const handleLoopLength = filesLength => {
    if (filesLength > 5) {
        return 5;
    }
    return filesLength;
}

const handleSauce = async (client, event) => {
    const { replyToken, source: { groupId, type }, message: { id } } = event;
    if (type === 'group') {
        if (groupId === devGroupId || groupId === efferianGroupId) {
            const imageResult = [];
            try {
                const [files] = await storage.bucket(`eff_temp`).getFiles();
                files.reverse();
                for (let a = 0; a < handleLoopLength(files.length); a++) {
                    imageResult.push({
                        "imageUrl": `https://storage.googleapis.com/eff_temp/${files[a].name}`,
                        "action": {
                            "type": "message",
                            "label": `${a + 1}`,
                            "text": `!vision ${files[a].name.toString()}`,
                        }
                    });
                }
                return client.replyMessage(replyToken, [
                    {
                        type: 'text',
                        text: '[fitur eksklusif] - anda mencari sumber dari gambar? pilih gambar yang ingin dicari sumbernya'
                    },
                    {
                        "type": "template",
                        "altText": "sauce",
                        "template": {
                            "type": "image_carousel",
                            "columns": imageResult
                        }
                    }
                ])
            } catch (err) {
                return client.replyMessage(replyToken, {
                    type: 'text',
                    text: JSON.stringify(err),
                });
            }
        }
    }

    return Promise.resolve(null);
}

module.exports = handleSauce;