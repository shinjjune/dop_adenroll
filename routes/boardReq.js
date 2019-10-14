var express = require('express');
var router = express.Router();
const {dop} = require('../models');

/* POST Join insert */
router.post('/', function(req, res, next) {
  // sequelize 이용하여 DB연동
    const result={msg:''};

    console.log(req.body.companyName);

     dop.create({
      title: req.body.title,
      companyName: req.body.companyName,
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
    })
    .then((rs)=>{
      console.log(rs);
      result.msg=`${req.body.companyName}님 환영합니다.`;
      res.json(JSON.stringify(result));
    })
    .catch((err)=>{
      console.error(err);
      result.msg=`가입오류`;
      res.json(JSON.stringify(result));
    });

});

module.exports = router;