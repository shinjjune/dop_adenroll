var express = require('express');
var router = express.Router();
var ibmdb = require("ibm_db");


router.get('/', (req, res, next) => {
    res.render('ticket');
});

module.exports = router;