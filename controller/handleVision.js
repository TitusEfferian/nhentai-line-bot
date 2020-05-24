const handleVision = (client, event, imageName) => {
    const { replyToken, source: { groupId }, message: { id } } = event;

    return client.replyMessage(replyToken, {
        type: 'text',
        text: imageName
    })
}

module.exports = handleVision;
