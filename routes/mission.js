var express = require('express');
var router = express.Router();

router.post('/insert', (req, res, next) => {
    // 블록체인에 Mission 저장

    res.render('index', {title : 'express'});
});

module.exports = router;