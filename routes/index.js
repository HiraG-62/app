const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const knex = require('../db/knex');
const render = require('../public/javascripts/rendarData');


/* GET home page. */
router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();

  if (isAuth) {
    const userId = req.user.id;
    knex('posts')
      .select('*')
      .then(function (results) {
        res.render('index', render.getRenderData(isAuth, 'index', 0, {posts: results}));
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', render.getRenderData(isAuth, 'index'));
      })
  } else {
    res.render('index', render.getRenderData(isAuth, 'index'));
  }
});

router.post('/content', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const post = req.body.contents;
  const subThreadIndex = req.body.sub_thread_index
  const date = new Date().toLocaleString('sv').replace(/-/g, '/').slice(0, -3);

  // knex('sub_threads')
  //   .select('*')
  //   .where({ 'user_id': userId})
  knex('posts')
    .insert({ 'contents': post, 'date': date })
    .then(function () {
      res.redirect('back');
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', render.getRenderData(isAuth, 'index'));
    })
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));
router.use('/mypage', require('./mypage'));
router.use('/lab', require('./lab'));
router.use('/manage', require('./manage'));

module.exports = router;