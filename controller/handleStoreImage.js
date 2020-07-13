const fetch = require("isomorphic-unfetch");
const storageEndpoint = process.env.NHENTAI_STORAGE.toString();
const devGroupId = process.env.DEV_GROUP_ID.toString();
const efferianGroupId = process.env.EFFERIAN_GROUP_ID.toString();

const handleStoreImage = async (client, event) => {
  const {
    replyToken,
    source: { groupId, type },
    message: { id },
  } = event;
  if (type === "group") {
    if (groupId === devGroupId || groupId === efferianGroupId) {
      try {
        const fetchResult = fetch(`${storageEndpoint}?messageId=${id}`);
        return Promise.resolve(null);
      } catch (err) {
        return client.replyMessage(replyToken, {
          type: "text",
          text: JSON.stringify(err),
        });
      }
    }
  }
  return Promise.resolve(null);
};

module.exports = handleStoreImage;
