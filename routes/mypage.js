const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
      const userId = req.user.id;

      knex('sub_threads')
        .select('*')
        .where({ user_id: userId })
        .then(function (subThreadsResults) {
          knex('posts')
            .select('*')
            .then(function (postsResults) {
              res.render('index', {
                title: 'マイページ',
                isAuth: isAuth,
                mainThread: 'mypage',
                subThreads: subThreadsResults,
                subThreadIndex: 0,
                posts: postsResults
              })
            })
        })
    }
  });


module.exports = router;