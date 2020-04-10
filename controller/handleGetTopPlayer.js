const db = require('../DatabaseConnector');

const handleGetTopPlayer = (resultCallbackWithData, resultCallbackWithNoData) => {
    const docRef = db.collection('TopEfferianMoment').orderBy("efferian_points", "desc").limit(10);
    const getUserData = docRef.get().then(snapshot => {
        if (snapshot.length === 0) {
            resultCallbackWithNoData();
        } else {
            const arrayOfResult = [];
            snapshot.forEach(doc => {
                arrayOfResult.push({
                    username: doc.data().username,
                    efferian_points: doc.data().efferian_points,
                });
            });
            resultCallback(arrayOfResult);
        }
    }).catch(err => {
        console.error(err);
    });
};

module.exports = handleGetTopPlayer;
