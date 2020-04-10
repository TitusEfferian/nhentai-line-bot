const db = require('../DatabaseConnector');

const handleGetTopPlayer = (resultCallback) => {
    const docRef = db.collection('TopEfferianMoment').orderBy("efferian_points", "desc").limit(10);
    const getUserData = docRef.get().then(doc => {
        if (!doc.exists) {
            resultCallback(doc.data());
        }
    }).catch(err => {
        console.error(err);
    });
};

module.exports = handleGetTopPlayer;
