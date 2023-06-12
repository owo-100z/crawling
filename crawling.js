const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async (url) => {
    try {
        return await axios.get(`${url}`);
    } catch (e) {
        console.log(e);
    }
}

exports.crawlProcess = async (req, res) => {
    // url: 크롤링할 사이트 url
    // reqObj: 크롤링할 정보 오브젝트
    const url = req.body.target;
    const reqObj = req.body.reqObj;
    const item = req.body.item;

    // 결과값을 담아줄 Object 선언
    var obj = {};

    try {
        // html 페이지를 받아온다
        const html = await getHtml(url);

        // 이후 cheerio을 이용하여 원하는 데이터 추출
        const $ = cheerio.load(html.data);

        const issueList = $(item);

        var resultList = [];

        for(var i=0; i<issueList.length; i++){
            var result = {};

            var keys = Object.keys(reqObj);

            for (var j = 0; j < keys.length; j++) {
                result[keys[j]] = $(issueList[i]).find(reqObj[keys[j]]).first().text().trim().replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
            }

            resultList.push(result);
        }

        obj['result'] = resultList;
    } catch (e) {
        console.log(e);
        // 오류가 날 경우 결과값은 빈값이 되게 함
        obj = {};
    }

    // json형식으로 반환
    res.json(obj);
};