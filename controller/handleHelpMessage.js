const handleHelpMessage = async (client, replyToken) => {
  return client.replyMessage(replyToken, {
    type: "text",
    text: "nhentai unofficial commands example",
    quickReply: {
      items: [
        {
          type: "action",
          action: {
            type: "message",
            label: "popular now",
            text: "nhentai popular now",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "reader",
            text: "g/310084",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "search",
            text: "nhentai suguha",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "random",
            text: "nhentai random",
          },
        },
        {
          type: "action",
          action: {
            type: "message",
            label: "info",
            text: "!nhentaiinfo 310084",
          },
        },
      ],
    },
  });
};

module.exports = handleHelpMessage;
