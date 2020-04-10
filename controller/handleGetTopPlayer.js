const db = require('../DatabaseConnector');

const handleGetTopPlayer = (resultCallback) => {
    const docRef = db.collection('TopEfferianMoment').orderBy("efferian_points", "desc").limit(10);
    const getUserData = docRef.get().then(snapshot => {
        const arrayOfResult = [];
        snapshot.forEach(doc=>{
            arrayOfResult.push({
                username: doc.data().username,
                efferian_points: doc.data().efferian_points,
            });
        });
        resultCallback(arrayOfResult);
    }).catch(err => {
        console.error(err);
    });
};

module.exports = handleGetTopPlayer;
