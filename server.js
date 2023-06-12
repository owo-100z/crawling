const express = require('express');
const crawling = require('./crawling');
const maria = require('./maria');
const query = require('./query');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* EJS를 뷰 템플릿 엔진으로 설정 */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/');

// jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(express.static(__dirname + '/'));

maria.connect();

// 메인화면 진입
app.get('/', function (req, res) {
    res.redirect('home');
});

// 홈화면 진입
app.get('/home', function (req, res) {
    const currPath = req.originalUrl; // 현재 경로
    query.selectInfo(function(err, rtn){
        var infoList = [];
        
        if(rtn){
            infoList = rtn;
        }

        res.render('home', { currPath, list: infoList });
    });
});

// 설정화면 진입
app.get('/setting', function (req, res) {
    const currPath = req.originalUrl; // 현재 경로
    query.selectInfo(function(err, rtn){
        var infoList = [];

        if(rtn){
            infoList = rtn;
        }

        res.render('setting', { currPath, list: infoList });
    });
});

// 설정 insert
app.post('/insert', function(req, res){
    query.insertInfo(req, function(err, rtn) {
        const json = {};

        if (rtn) {
            json.rtn = rtn;
        } else {
            json.err = err;
        }

        res.json(json);
    });
});

// 설정 update
app.post('/update', function(req, res){
    query.updateInfo(req, function(err, rtn) {
        const json = {};

        if (rtn) {
            json.rtn = rtn;
        } else {
            json.err = err;
        }

        res.json(json);
    });
});

// 설정 delete
app.post('/delete', function(req, res){
    query.deleteInfo(req, function(err, rtn) {
        const json = {};

        if (rtn) {
            json.rtn = rtn;
        } else {
            json.err = err;
        }

        res.json(json);
    });
});

// 크롤링 정보 select
app.get('/select', function(req, res){
    query.selectInfo(function(err, rtn) {
        const json = {};

        if (rtn) {
            json.rtn = rtn;
        } else {
            json.err = err;
        }

        res.json(json);
    });
});

// 크롤링
app.post('/crawl', crawling.crawlProcess);

/* 서버 시작 */
app.listen(8080, function () {
    console.log('server start');
});