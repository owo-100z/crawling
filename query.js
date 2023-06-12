const maria = require('./maria');

const queryExcute = (qry, callback) => {
    maria.query(qry, function(err, rows, fields){
        if (!err) {
            callback(null, rows);
        } else {
            console.error(`err: ${err}`);
            callback(err, null);
        }
    });
}

// select 구현부 ------
const selectInfo = (callback) => {
    qry = `SELECT *
             FROM CRAWL_INFO`;
    
    queryExcute(qry, callback);
}

// CUD 구현부 --------
const insertInfo = (req, callback) => {
    const data = req.body;
    var crawlObject = data.crawlObject;

    crawlObject = objToJson(crawlObject);

    if(crawlObject.err){
        return callback({'message': '크롤링 정보가 json형식이 아닙니다.'}, null);
    }

    qry = `INSERT INTO
                CRAWL_INFO ( CRAWL_NAME
                            , CRAWL_URL
                            , CRAWL_ITEM
                            , CRAWL_OBJECT )
           VALUES ( '${data.crawlName}'
                  , '${data.crawlUrl}'
                  , '${data.crawlItem}'
                  , '${crawlObject}' )`;

    queryExcute(qry, callback);
}

const updateInfo = (req, callback) => {
    const data = req.body;

    if(!data.crawlId){
        return callback({'message': '잘못된 요청입니다.'}, null);
    }

    var crawlObject = data.crawlObject;

    crawlObject = objToJson(crawlObject);

    if(crawlObject.err){
        return callback({'message': '크롤링 정보가 json형식이 아닙니다.'}, null);
    }

    qry = `UPDATE CRAWL_INFO
              SET CRAWL_NAME = '${data.crawlName}'
                , CRAWL_URL = '${data.crawlUrl}'
                , CRAWL_ITEM = '${data.crawlItem}'
                , CRAWL_OBJECT = '${crawlObject}'
            WHERE CRAWL_ID = '${data.crawlId}'`;

    queryExcute(qry, callback);
}

const deleteInfo = (req, callback) => {
    const data = req.body;

    if(!data.crawlId){
        return callback({'message': '잘못된 요청입니다.'}, null);
    }

    qry = `DELETE FROM CRAWL_INFO
            WHERE CRAWL_ID = '${data.crawlId}'`;

    queryExcute(qry, callback);
}

// string을 작은따옴표(')로 만들었으면 큰따옴표(")로 바꿔준다.
// 만약 이스케이프 문자(백슬래시)가 포함되어있다면 문자 하나당 4개로 변환.
// 그 뒤 큰따옴표(")는 앞에 이스케이프 문자 2개를 추가해준다.
// JSON형식으로 바꾸기 위해 해야함..
const objToJson = (objStr) => {
    try{
        objStr = objStr.replace(/'/g,'"');
        JSON.parse(objStr);
        return objStr.replace(/\\/g, '\\\\\\\\').replace(/"/g, '\\\\\"');
    }catch(e){
        console.log(e);
        return {'err': 'json pasing err'};
    }
}

module.exports = { selectInfo, insertInfo, updateInfo, deleteInfo };