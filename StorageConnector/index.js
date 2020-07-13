const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./database.json",
});

module.exports = storage;
