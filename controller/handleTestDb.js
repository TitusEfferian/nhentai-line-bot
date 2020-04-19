const db = require('../DatabaseConnector');


const handleNhentaiSearch = (client, replyToken, newData) => {
    const docRef = db.collection('TestAsync');
    docRef.add({
        nama: newData,
    })
    return client.replyMessage(replyToken, {
        "type": "text",
        "text": "done",
    });
};

module.exports = handleNhentaiSearch;