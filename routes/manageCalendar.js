const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();

    res.render('manageCalendar', {
        title: 'カレンダー設定',
        isAuth: isAuth,
        mainThread: 'manage',
        subThreads: [ '研究室管理ページ', 'カレンダー編集' ],
        subThreadIndex: 1,
    })
});

router.post('/', function(req, res, next) {

});

module.exports = router;