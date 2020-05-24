const devGroupId = process.env.DEV_GROUP_ID.toString();

const handleSauce = (client, event) => {
    const { replyToken, source: { groupId }, message: { id } } = event;
    if (groupId === devGroupId) {
        return client.replyMessage(replyToken,[
            {
                type: 'text',
                text: 'anda mencari sumber dari gambar?'
            },
            {
                type: 'text',
                text: 'pilih gambar berikut yang ingin dicari sumbernya'
            }
        ])
    }
    return;
}

module.exports = handleSauce;