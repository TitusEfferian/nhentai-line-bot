const fetch = require('isomorphic-unfetch');

const nhentaiGetInfo = process.env.NHENTAI_SEARCH_INFO.toString();

const handleNhentaiInfo = async (searchParams, client, replyToken) => {
    const fetchGethInfo = await fetch(nhentaiGetInfo + '?id=' + searchParams);
    const infoResult = await fetchGethInfo.json();
    const resultData = infoResult.data;
    const tagsData = resultData.tags;

    const titleData = resultData.title;

    const tags = tagsData.filter(x=>x.type === 'tag') || [];
    const language = tagsData.filter(x=>x.type === 'language') || []; 
    const artist = tagsData.filter(x=>x.type === 'artist') || [];
    const parody = tagsData.filter(x=>x.type === 'parody') || [];
    const character = tagsData.filter(x=>x.type === 'character') || [];

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
    

    return client.replyMessage(replyToken, {
        type: 'text',
        text: `info for this code ` + searchParams + `\n\n
        Title : `+ 'lagi di debug alma' +`\n
        Language : `+ language.map(x=>x.name).toString() +`\n
        Artist : `+ artist.map(x=>x.name).toString() +`\n
        Parody : `+ parody.map(x=>x.name).toString() +`\n
        Character : `+ character.map(x=>x.name).toString() +`\n
        Tags : `+ tags.map(x=>x.name).toString() +`\n
        `
    });
};

module.exports = handleNhentaiInfo;
