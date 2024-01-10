const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();

    res.render('manage_calendar', {
        title: 'カレンダー設定',
        isAuth: isAuth,
    })
});

router.post('/', function(req, res, next) {

});

module.exports = router;