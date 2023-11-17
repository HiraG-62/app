const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const knex = require('../db/knex');


/* GET home page. */
router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    const userId = req.user.id;
    knex('posts')
      .select('*')
      .then(function (results) {
        console.log(results);
        res.render('index', {
          title: 'Leaf',
          userId: userId,
          posts: results,
          isAuth: isAuth,
        })
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'Leaf',
          isAuth: isAuth,
        })
      })
  } else {
    res.render('index', {
      title: 'Leaf',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const post = req.body.add;
  console.log(userId);

  knex('posts')
    .insert({ user_id: userId, content: post })
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Leaf',
        isAuth: isAuth,
      })
    })
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
router.use('/mypage', require('./mypage'));

module.exports = router;