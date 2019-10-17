var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var ibmdb = require("ibm_db");

router.get('/', (req, res, next) => {
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'dop'
      });
    
    con.connect((err) => {
      let result={};
        if(err) { // connect error
            return console.error(err.message);
        } else { // connect good
            //console.log('DB 연결 완료');
            const sql = `select postNumber, adState, title, dateTime, missionUserNum, startDate, endDate 
                        from ad_form `;
            //console.log(sql);
            con.query(sql, (err, results, fields) => {
                //console.log(sql);
                
                result=results;
                //console.log(result);
    
                res.render('admin', {
                  user_id: req.session.user_id,
                  loginState: req.session.loginState,
                  result: result
              });
            });

          con.end((err) => {
            if(err) {
                return console.log(err.message);
            }
            //console.log("DB 연결 해제");
          });
        }
    });
});


router.post('/', function (req, res, next) {
    console.log(req.body);

    const con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysql',
      database: 'dop'
    });
    
    if(req.body.approval=='approval'){
        console.log(req.body);
        console.log('-------------approval----------------');
        const sql = `update ad_form set adState = 'approval' where postNumber= '${req.body.test}'`
        con.query(sql, (err, results, fields) => {
            if (err) {
              console.error(err.message);
              res.json(JSON.stringify(results));
              //  query문이 정상일 경우 수행
            } else {
              console.log(results, fields);
              res.json(JSON.stringify(results));
            }
            // 연결 종료
            con.end((err) => {
              if (err) {
                return console.error(err.message);
              }
            });
          });


    } else if(req.body.refusal=='refusal'){
        console.log('-------------refusal----------------');
        const sql = `update ad_form set adState = 'refusal' where postNumber= '${req.body.test}'`
        con.query(sql, (err, results, fields) => {
            if (err) {
              console.error(err.message);
              res.json(JSON.stringify(results));
              //  query문이 정상일 경우 수행
            } else {
              console.log(results, fields);
              res.json(JSON.stringify(results));
            }
            // 연결 종료
            con.end((err) => {
              if (err) {
                return console.error(err.message);
              }
            });
          });
    } 
});


module.exports = router;
