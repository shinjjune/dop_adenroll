var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysql',
  database: 'dop'
});

// router.get('/', function(req, res, next) {
//   res.render('board',{
//     user_id : req.session.user_id,
//     loginState: req.session.loginState
//   });
// });

router.post('/', function (req, res, next) {
  const result = {
    title: req.body.title,
    companyName: req.body.companyName,
    companyAddress: req.body.companyAddress,
    companyURL: req.body.companyURL,
    managerName: req.body.managerName,
    managerEmail1: req.body.managerEmail1,
    managerEmail2: req.body.managerEmail2,
    missionCondition: req.body.missionCondition,
    missionUserNum: req.body.missionUserNum,
    content: req.body.content,
    tag: req.body.tag,
    inputGroupFile: req.body.inputGroupFile,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    survey: req.body.survey,
    survey2: req.body.survey2,
    survey3: req.body.survey3
  };

  

  con.connect((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('DB Connected', `${req.body.title} : ${req.body.companyName} : 
                                 ${req.body.companyAddress} : ${req.body.companyURL} : 
                                 ${req.body.managerName} : ${req.body.managerEmail1} : 
                                 ${req.body.managerEmail2} : ${req.body.missionCondition} : 
                                 ${req.body.missionUserNum} : ${req.body.content} :
                                 ${req.body.tag}: ${req.body.inputGroupFile} :
                                 ${req.body.startDate} : ${req.body.endDate} : 
                                 ${req.body.survey}: ${req.body.survey2}: ${req.body.survey3}`);
    // sql query문에 해당함
    const sql = `insert into ad_form(
                    title, companyName,
                    companyAddress, companyURL,
                    managerName, managerEmail1,
                    managerEmail2, missionCondition,
                    missionUserNum, content,
                    tag, inputGroupFile,
                    startDate, endDate,
                    survey, survey2, survey3) values (
                      '${req.body.title}', '${req.body.companyName}', 
                      '${req.body.companyAddress}', '${req.body.companyURL}', 
                      '${req.body.managerName}', '${req.body.managerEmail1}', 
                      '${req.body.managerEmail2}', '${req.body.missionCondition}', 
                      '${req.body.missionUserNum}', '${req.body.content}',
                      '${req.body.tag}', '${req.body.inputGroupFile}',
                      '${req.body.startDate}', '${req.body.endDate}', 
                      '${req.body.survey}', '${req.body.survey2}', '${req.body.survey3}')`;
    console.log(sql);
    // query문 수행하는 곳
    con.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err.message);
        res.json(JSON.stringify(results));
        //  query문이 정상일 경우 수행
      } else {
        console.log(results, fields);
        result.txt = `${req.body.title} 등록성공했습니다.`;
        res.json(JSON.stringify(result));
      }
      // 연결 종료
      con.end((err) => {
        if (err) {
          return console.error(err.message);
        }
      });
    });
  });
});
con.connect((err) => {
  if(err) {
      console.log(err);
      return;
  }
  console.log( 'mysql connect completed' );
});

router.get('/', (req, res) => {
  const sql2 = 'select title, companyName, startDate, endDate from ad_form';
  con.query(sql2, (err, results, field) => {
    console.log(results); // 배열 형태로 결과가 떨어짐
    res.render('board', {
      user_id: req.session.user_id,
      loginState: req.session.loginState,
      // layout: false, // express-ejs-layouts는 기본으로 layout.ejs가 설정되어야 하는데 이를 사용하지 않을 경우
      ad_form: results
    });
  });
});


module.exports = router;
