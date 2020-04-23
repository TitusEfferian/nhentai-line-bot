const moment = require('moment-timezone');

const shouldBlockRequest = () => {
    const jakartaTime = moment().tz('Asia/Jakarta').hours();
    if(jakartaTime >=4 && jakartaTime <= 17) {
        return true;
    }
    return false;
}

module.exports = shouldBlockRequest;
