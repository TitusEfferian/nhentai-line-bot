const dayjs = require('dayjs');
const db = require('../DatabaseConnector');

const handleNhenTrack = () => {
    const docRef = db.collection('nhentai tracker').doc(dayjs().format('DD M YYYY'));
    docRef.get().then(doc => {
        if (!doc.exists) {
            const setAda = docRef.set({
                nhenSearch: 1,
            });
        } else {
            const setAda = docRef.set({
                nhenSearch: doc.data().nhenSearch + 1,
            });
        }
    }).catch(err => {
        console.error(err);
    });
};

module.exports = handleNhenTrack;
