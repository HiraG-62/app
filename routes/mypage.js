const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
      const userId = req.user.id;

      knex('sub_threads')
        .select('*')
        .where({ user_id: userId, main_thread_id: 2 })
        .then(function (subThreadsResults) {
          knex('posts')
            .select('*')
            .then(function (postsResults) {
              res.render('index', {
                title: 'マイページ',
                isAuth: isAuth,
                mainThread: 'mypage',
                mainThreadId: 2,
                subThreads: subThreadsResults,
                subThreadIndex: 0,
                posts: postsResults
              })
            })
        })
    } else {
      res.redirect('/');
    }
  });


module.exports = router;