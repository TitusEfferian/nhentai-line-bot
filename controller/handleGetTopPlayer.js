const db = require('../DatabaseConnector');

const handleGetTopPlayer = (resultCallbackWithData, resultCallbackWithNoData, onError) => {
    const docRef = db.collection('TopEfferianMoment').orderBy("efferian_points", "desc").limit(10);
    const getUserData = docRef.get().then(snapshot => {
        const arrayOfResult = [];
        snapshot.forEach(doc => {
            arrayOfResult.push({
                username: doc.data().username,
                efferian_points: doc.data().efferian_points
            });
        });
        if (arrayOfResult.length === 0) {
            resultCallbackWithNoData();
        } else {
            resultCallbackWithData(arrayOfResult);
        }
    }).catch(err => {
        onError(err);
        console.error(err);
    });
};

module.exports = handleGetTopPlayer;
