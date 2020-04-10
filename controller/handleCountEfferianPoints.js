const db = require('../DatabaseConnector');

const handleCountEfferianPoints = ({ username }) => {
    const docRef = db.collection('TopEfferianMoment').doc(username);
    const getUserData = docRef.get().then(doc => {
        if (!doc.exists) {
            const setAda = docRef.set({
                username: username,
                efferian_points: 1,
            });
        } else {
            const setAda = docRef.set({
                username: username,
                efferian_points: doc.data().efferian_points + 1,
            });
        }
    }).catch(err => {
        console.error(err);
    });
};

module.exports = handleCountEfferianPoints;
