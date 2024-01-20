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
        res.render('index', {
          title: 'ホーム',
          isAuth: isAuth,
          mainThread: 'home',
          subThreads: [ 'トップページ', '全体連絡', 'カレンダー' ],
          subThreadIndex: '0'
        })
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'Leaf',
          isAuth: isAuth,
          mainThread: 'home',
        })
      })
  } else {
    res.render('index', {
      title: 'Leaf',
      isAuth: isAuth,
      mainThread: 'home',
    })
  }
});

router.post('/content', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const post = req.body.contents;

  knex('posts')
    .insert({ 'contents': post })
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Leaf',
        userId: userId,
        posts: results,
        isAuth: isAuth,
      })
    })
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const labId = req.user.lab_id;
  const post = req.body.add;

  knex('posts')
    .insert({ 'user_id': userId, 'lab_id': labId, 'contents': post })
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'Leaf',
        userId: userId,
        posts: results,
        isAuth: isAuth,
      })
    })
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
router.use('/mypage', require('./mypage'));
router.use('/lab', require('./lab'));
router.use('/manage', require('./manage'));

module.exports = router;