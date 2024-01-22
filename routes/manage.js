const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const render = require('../public/javascripts/rendarData');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
      res.render('manage', render.getRenderData(isAuth, 'manage'));
    } else {
      res.render('index', render.getRenderData(isAuth, 'index'));
    }
  });

router.post('/', function(req, res, next) {

});

router.use('/assignlabs', require('./assignlabs'));
router.use('/manageCalendar', require('./manageCalendar'));

module.exports = router;