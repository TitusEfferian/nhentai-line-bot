const fetch = require("isomorphic-unfetch");
const get = require("lodash/get");

const nhentaiGetInfo = process.env.NHENTAI_SEARCH_INFO.toString();

const handleNhentaiInfo = async (searchParams, client, replyToken) => {
  const fetchGethInfo = await fetch(`${nhentaiGetInfo}?id=${searchParams}`);
  const { success, data } = await fetchGethInfo.json();

  const error = get(data, "error", false);

  if (!success || error) {
    return client.replyMessage(replyToken, {
      type: "text",
      text: "no info found for this search term " + searhParams,
    });
  } else if (success) {
    const titleData = data.title;
    const tagsData = data.tags;

    const tags = tagsData.filter((x) => x.type == "tag");
    const language = tagsData.filter((x) => x.type === "language");
    const artist = tagsData.filter((x) => x.type === "artist");
    const parody = tagsData.filter((x) => x.type === "parody");
    const character = tagsData.filter((x) => x.type === "character");

    return client.replyMessage(replyToken, {
      type: "text",
      text:
        `info for this code ` +
        searchParams +
        `\n\n` +
        `Title : ` +
        titleData.english +
        `\n` +
        `Language : ` +
        language.map((x) => x.name).toString() +
        `\n\n` +
        `Artist : ` +
        artist.map((x) => x.name).toString() +
        `\n\n` +
        `Parody : ` +
        parody.map((x) => x.name).toString() +
        `\n\n` +
        `Character : ` +
        character.map((x) => x.name).toString() +
        `\n\n` +
        `Tags : ` +
        tags
          .map((x) => x.name)
          .join(", ")
          .toString() +
        `\n\n`,
    });
  } else {
    return client.replyMessage(replyToken, {
      type: "text",
      text: "Invalid input " + searhParams,
    });
  }
};

module.exports = handleNhentaiInfo;
