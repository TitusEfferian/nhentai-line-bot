const fetch = require("isomorphic-unfetch");

const nhentaiSearchCrawler = process.env.NHENTAI_SEARCH_CRAWLER.toString();
const nhentaiByPassOriginal = process.env.NHENTAI_BYPASS_ORIGINAL.toString();
const nhentaiFullReader = process.env.NHENTAI_FULL_READER.toString();
const nhentaiSearchV2 = process.env.NHENTAI_SEARCH_V2.toString();

const handleNhentaiSearch = async (searhParams, client, replyToken) => {
  try {
    const isPopular = searhParams.split(" popular");
    const searchSanitize = isPopular[0].replace(" ", "%20");
    const fetchSearchCrawler = await fetch(
      `${nhentaiSearchV2}?search=${searchSanitize}&sort=${
        isPopular.length === 1 ? "date" : "popular"
      }`
    );
    const { arrayOfResult } = await fetchSearchCrawler.json();

    const arrayOfColumns = [];
    if (arrayOfResult.length === 0) {
      return client.replyMessage(replyToken, {
        type: "text",
        text: "no result for " + searhParams,
      });
    }
    const handleValidateIncrement = () => {
      if (arrayOfResult.length > 10) {
        return 10;
      }
      return arrayOfResult.length;
    };
    for (let a = 1; a <= handleValidateIncrement(); a++) {
      arrayOfColumns.push({
        imageUrl: `${nhentaiByPassOriginal}?source=${
          arrayOfResult[a - 1].preview
        }`,
        action: {
          type: "uri",
          label: arrayOfResult[a - 1].nhentai_id,
          uri: `${nhentaiFullReader}?source=${
            arrayOfResult[a - 1].nhentai_id.split("/")[1]
          }`,
          // "uri": `https://nhentai.net/g/${arrayOfResult[a - 1].nhentai_id.split('/')[1]}`,
        },
      });
    }
    if (isPopular.length === 1) {
      return client.replyMessage(replyToken, [
        {
          type: "text",
          text: "click the pictures to see full content",
        },
        {
          type: "template",
          altText: "nhentai results",
          template: {
            type: "image_carousel",
            columns: arrayOfColumns,
          },
          quickReply: {
            items: [
              {
                type: "action",
                action: {
                  type: "message",
                  label: "sort by popular",
                  text: `nhentai ${searhParams} popular`,
                },
              },
              {
                type: "action",
                action: {
                  type: "message",
                  label: "popular now",
                  text: `nhentai popular now`,
                },
              },
            ],
          },
        },
      ]);
    }
    return client.replyMessage(replyToken, [
      {
        type: "text",
        text: "click the pictures to see full content",
      },
      {
        type: "template",
        altText: "nhentai results",
        template: {
          type: "image_carousel",
          columns: arrayOfColumns,
        },
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                label: "popular now",
                text: `nhentai popular now`,
              },
            },
          ],
        },
      },
    ]);
  } catch (err) {
    return client.replyMessage(replyToken, {
      type: "text",
      text: JSON.stringify(err),
    });
  }
};

module.exports = handleNhentaiSearch;
