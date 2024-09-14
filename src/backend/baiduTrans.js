const crypto = require('crypto');
const querystring = require('querystring');
const process = require('process');

const appid = process.env.baiduTransAppId;
const apiKey = process.env.baiduTransApiKey;

function new_request(q, from, to) {
    const salt = Math.floor(Math.random() * 1000);
    let sign = appid + q + salt + apiKey
    sign = crypto.createHash('md5').update(sign).digest('hex');

    let submitData = {q, from, to, appid, salt, sign};
    submitData = querystring.stringify(submitData);

    let request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: submitData
        }

    return request
}

function isEmpty(str) {
    return str.trim().length === 0;
}

async function sendBaiduTrans(q, from, to) {
    console.debug(`${__filename} q: ${q}\n`)
    if (isEmpty(q)) return ""

    let request = new_request(q, from, to)
    let resp = await fetch(
        "https://fanyi-api.baidu.com/api/trans/vip/translate",
        request
    )
    let data = await resp.json()

    let dst = data.trans_result
                .map(line => line.dst)
                .join('\n')
    return dst
}

async function sendBaiduTransWithConfig(config, q) {
    return await sendBaiduTrans(q, config.from, config.to)
}

exports.sendBaiduTrans = sendBaiduTrans
exports.sendBaiduTransWithConfig = sendBaiduTransWithConfig 