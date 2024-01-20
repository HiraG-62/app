const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const { renderScrollShim } = require('@fullcalendar/core/internal');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
    console.log(req.user)
  
    if (isAuth) {
      const userId = req.user.id;

      res.render('lab', {
        title: '研究室',
        isAuth: isAuth,
        mainThread: 'lab',
        subThreads: [ '連絡', '研究成果記録' ],
        subThreadIndex: 0
      })
      // knex('posts')
      //   .select('*')
      //   .where({ 'lab_id': labId })
      //   .then(function (results) {
      //     console.log(results);
      //     res.render('lab', {
      //       title: 'Leaf',
      //       userId: userId,
      //       posts: results,
      //       isAuth: isAuth,
      //     })
      //   })
      //   .catch(function (err) {
      //     console.error(err);
      //     res.render('index', {
      //       title: 'Leaf',
      //       userId: userId,
      //       posts: results,
      //       isAuth: isAuth,
      //     })
      //   })
    } else {
      res.render('index', {
        title: 'Leaf',
        isAuth: isAuth,
      })
    }
  });

router.post('/', function(req, res, next) {

});

module.exports = router;