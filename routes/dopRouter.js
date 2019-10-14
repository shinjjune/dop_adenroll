var express = require('express');
var router = express.Router();
var ibmdb = require("ibm_db");

// var dsn2 = "DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-03.services.dal.bluemix.net;PORT=50000;PROTOCOL=TCPIP;UID=bjr81526;PWD=qsl^240pblh3qnmx;";
var dsn = require("../DBconfig");

// var app = express();

// main page render
router.get('/', (req, res, next) => {
    res.render('index');
});

// DB 읽기 (select)
router.get('/readDB', (req, res, next) => {
    ibmdb.open(dsn, function (err, connection) {
        if (err) { // 에러처리
            console.log(err);
            return;
        }
        // 특정 id data 불러올 때 : "select * from geotest where userid='321'"
        connection.query("select * from geotest", function (err1, readData) {
            if (err1) console.log(err1); // 에러처리
            else {
                console.log(JSON.parse(readData[15].GEODATA));
                res.render('showdata', { data: readData }) // showdata 페이지 렌더
            }
            connection.close(function (err2) {
                if (err2) console.log(err2); // 에러처리
            });
        });
    });
});



// map page
router.get('/map', function(req, res, next) { 
    ibmdb.open(dsn, function (err, connection) {
        if (err) {
            console.log(err);
            return;
        }
        connection.query("select * from geotest", function (err1, readData) {
            if(err1) console.log(err1);
                else {
                var lat = [];
                var lon = [];
                var list = [];
                var useridList = [];
                var userid = [];
                var timestamp = [];

                for(var i=0; i<readData.length; i++){
                userid[i] =readData[i].USERID;
                //console.log(userid[i]); undefined..
                timestamp[i] = new Date(JSON.parse(readData[i].GEODATA).timestamp).
                                        toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'});
                lat[i] = JSON.parse(readData[i].GEODATA).coords.latitude;
                lon[i] = JSON.parse(readData[i].GEODATA).coords.longitude; 
                list[i] = [userid[i],timestamp[i],lat[i],lon[i]];
                }
                console.log(timestamp);
                //console.log(readData);
                //console.log(list);
                //res.render('map', { data: list, useridList: useridList })
                connection.query("select distinct userid from geotest", (err3, readUserid) => {
                    if (err3) console.log(err3);
                    else {
                        for (var i in readUserid) {
                            useridList.push(String(Object.values(readUserid[i])));
                        }
                        useridList.forEach((ele, idx) => {
                            var strList = ele.split(' ');
                            //useridList[idx] = strList[0];
                            console.log(useridList[idx]);
                        })
                        
                        //console.log('useridList', useridList);
                        //console.log('useridList Length', useridList.length);
                        //console.log(useridList[0], useridList[1]);
                        res.render('map', {
                            data: [
                                { geodata: list },
                                { useridList: useridList }
                            ]
                        });
                    }
                });
            }


            connection.close(function (err2) {
                if (err2) console.log(err2); // 에러처리
            });
        })
    })       
});


module.exports = router;