const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
      res.render('manage', {
        title: '管理機能',
        isAuth: isAuth,
        mainThread: 'manage',
        subThreads: [ '研究室管理ページ', 'カレンダー編集' ],
        subThreadIndex: 0
      });
    } else {
      res.render('index', {
        title: 'Leaf',
        isAuth: isAuth,
      })
    }
  });

router.post('/', function(req, res, next) {

});

router.use('/assignlabs', require('./assignlabs'));
router.use('/manageCalendar', require('./manageCalendar'));

module.exports = router;