const db = require('../DatabaseConnector');

const handleAddToDatabase = () => {
    let docRef = db.collection('users').doc('alovelace');

    let setAda = docRef.set({
        first: 'Ada',
        last: 'Lovelace',
        born: 1815
    });

};

module.exports = handleAddToDatabase;
