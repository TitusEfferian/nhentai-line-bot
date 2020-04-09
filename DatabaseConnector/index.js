const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'fleet-range-273715',
  keyFilename: './database.json',
});

module.exports = db;
