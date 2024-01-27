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
      .then(function(results) {
        knex('posts')
          .select('*')
          .join('sub_threads')
          .where({ user_id: userId, main_thread_id: 2, 'sub_thread_id': knex.raw('sub_threads.id')})
          .then(function (postsResults) {
            res.render('index', {
              title: 'マイページ',
              isAuth: isAuth,
              mainThread: 'mypage',
              mainThreadId: 2,
              subThreads: results,
              subThreadIndex: 0,
              posts: postsResults
            })
          })
      })
  } else {
    res.redirect('/');
  }
});


router.post('/', function(req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const post = req.body.contents;
  const mainThreadId = req.body.main_thread_id;
  const subThreadIndex = req.body.sub_thread_index;
  const date = new Date().toLocaleString('sv').replace(/-/g, '/').slice(0, -3);


  knex('sub_threads')
    .select('*')
    .where({ user_id: userId, main_thread_id: mainThreadId })
    .then(function (results) {
      console.log(results)
      knex('posts')
        .insert({ sub_thread_id: results[subThreadIndex].id, contents: post, date: date })
        .then(function () {
          knex('posts')
            .select('*')
            .then(function (postsResults) {
              console.log(subThreadIndex)
              res.render('index', {
                title: 'マイページ',
                isAuth: isAuth,
                mainThread: 'mypage',
                mainThreadId: mainThreadId,
                subThreads: results,
                subThreadIndex: subThreadIndex,
                posts: postsResults
              })
            })
        })
    })
})


module.exports = router;