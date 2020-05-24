const devGroupId = process.env.DEV_GROUP_ID.toString();
const storage = require('../StorageConnector');

const handleLoopLength = filesLength => {
    if (filesLength > 5) {
        return 5;
    }
    return filesLength;
}

const handleSauce = async (client, event) => {
    const { replyToken, source: { groupId }, message: { id } } = event;
    if (groupId === devGroupId) {
        const imageResult = [];
        try {
            const [files] = await storage.bucket(`eff_temp`).getFiles();
            files.reverse();
            for (let a = 0; a < handleLoopLength(files.length); a++) {
                imageResult.push({
                    "imageUrl": `https://storage.googleapis.com/eff_temp/${files[a].name}`,
                    "action": {
                        "type": "message",
                        "label": `${a+1}`,
                        "text": `sauce_id ${files[a].name.toString()}`,
                    }
                });
            }
            return client.replyMessage(replyToken, [
                {
                    type: 'text',
                    text: 'anda mencari sumber dari gambar? pilih gambar yang ingin dicari sumbernya'
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
            console.log(err)
            return client.replyMessage(replyToken, {
                type: 'text',
                text: JSON.stringify(err),
            });
        }
    }
    return;
}

module.exports = handleSauce;