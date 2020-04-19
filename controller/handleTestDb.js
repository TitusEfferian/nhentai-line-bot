const db = require('../DatabaseConnector');


const handleNhentaiSearch = (client, replyToken) => {
    const docRef = db.collection('TestAsync').doc('test data');
    docRef.set({
        nama: 'titus efferian',
        nim: '190'
    })
    return client.replyMessage(replyToken, {
        "type": "text",
        "text": "done",
    });
};

module.exports = handleNhentaiSearch;