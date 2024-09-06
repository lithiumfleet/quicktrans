const crypto = require('crypto');  // 用来生成 md5 的模块
const querystring = require('querystring');  // 用来把对象转换为查询字符串的模块

const appid = '';  // 百度翻译的 AppID
const apiKey = '';  // 百度翻译的 API Key

function new_request( q, from, to) {
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



async function baidutrans(q, from, to) {
    let request = new_request(q, from, to)
    let resp = await fetch(
        "https://fanyi-api.baidu.com/api/trans/vip/translate",
        request
    )
    let data = await resp.json()

    return data
}

export { baidutrans }