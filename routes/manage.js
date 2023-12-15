const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
      res.render('manage', {
        title: 'Leaf',
        isAuth: isAuth,
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

module.exports = router;