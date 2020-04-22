const fetch = require('isomorphic-unfetch');

const nhentaiGetInfo = process.env.NHENTAI_SEARCH_INFO.toString();

const handleNhentaiInfo = async (searchParams, client, replyToken) => {
    const fetchGethInfo = await fetch(nhentaiGetInfo + '?id=' + searchParams);
    const infoResult = await fetchGethInfo.json();
    const resultData = infoResult.data;
    const tagsData = resultData.tags;

    const tags = [];
    const language = [];
    const artist = [];
    const parody = [];
    const character = [];

    if (resultData.error === true) {
        return client.replyMessage(replyToken, {
            "type": "text",
            "text": "no info found for this code " + searhParams,
        });
    }else if(infoResult.success === false){
        return client.replyMessage(replyToken, {
            "type": "text",
            "text": "no info found for this code " + searhParams,
        });
    }
    
    for (let a = 1; a <= tagsData.length; a++) {
        if(tagsData[a].type === "tag"){
            tags.push(tagsData[a].name)
        }
        if(tagsData[a].type === "language"){
            language.push(tagsData[a].name)
        }
        if(tagsData[a].type === "artist"){
            artist.push(tagsData[a].name)
        }
        if(tagsData[a].type === "parody"){
            parody.push(tagsData[a].name)
        }
        if(tagsData[a].type === "character"){
            character.push(tagsData[a].name)
        }
    }

    return client.replyMessage(replyToken, {
        type: 'text',
        text: `info for this code ` + searchParams + `\n\n
        Title : `+ tagsData.title.english +`\n
        Language : `+ language.toString() +`\n
        Artist : `+ artist.toString() +`\n
        Parody : `+ parody.toString() +`\n
        Character : `+ character.toString() +`\n
        Tags : `+ tag.toString() +`\n
        `
    });
};

module.exports = handleNhentaiInfo;
