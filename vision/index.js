const vision = require('@google-cloud/vision');

const visionObj = new vision.ImageAnnotatorClient({
    keyFilename: './database.json',
});

module.exports = visionObj;
