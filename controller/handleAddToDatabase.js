const db = require('../DatabaseConnector');

const handleAddToDatabase = (data) => {
    let docRef = db.collection('TopEfferiaMoment').doc(data);

    let setAda = docRef.set({
        name: data
    });

};

module.exports = handleAddToDatabase;
