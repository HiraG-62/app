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
        .then(function (results) {
          res.render('mypage', {
            title: 'マイページ',
            isAuth: isAuth,
            mainThread: 'mypage',
            subThreads: results,
            subThreadIndex: 0
          })
        })

    //   knex('posts')
    //     .select('*')
    //     .where({user_id: userId})
    //     .then(function (results) {
    //       res.render('mypage', {
    //         title: 'マイページ',
    //         isAuth: isAuth,
    //       })
    //     })
    //     .catch(function (err) {
    //       console.error(err);
    //       res.render('index', {
    //         title: 'Leaf',
    //         isAuth: isAuth,
    //       })
    //     })
    // } else {
    //   res.render('index', {
    //     title: 'Leaf',
    //     isAuth: isAuth,
    //   })
    // }
    }
  });

router.post('/', function(req, res, next) {

});

module.exports = router;