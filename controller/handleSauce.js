const devGroupId = process.env.DEV_GROUP_ID.toString();
const storage = require('../StorageConnector');

const handleLoopLength = filesLength => {
    if(filesLength > 5) {
       return 5; 
    }
    return filesLength;
}

const handleSauce = (client, event) => {
    const { replyToken, source: { groupId }, message: { id } } = event;
    const imageResult = [];
    if (groupId === devGroupId) {
        const [files] = await storage.bucket(`eff_temp`).getFiles();
        for (let a = 0; a < handleLoopLength(files.length); a++) {
            imageResult.push({
                "imageUrl": `https://storage.cloud.google.com/eff_temp/${files[a].name}`,
                "action": {
                    "type": "message",
                    "label": `${files[a].name}`,
                    "text": `sauce_id ${files[a].name}`,
                }
            });
        }
        return client.replyMessage(replyToken,[
            {
                type: 'text',
                text: 'anda mencari sumber dari gambar?'
            },
            {
                type: 'text',
                text: 'pilih gambar berikut yang ingin dicari sumbernya'
            },
            {
                type: 'template',
                altText: 'list of image',
                template: {
                    type: 'image_carousel',
                    columns: imageResult,
                }
            }
        ])
    }
    return;
}

module.exports = handleSauce;