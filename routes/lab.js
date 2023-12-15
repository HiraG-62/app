const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
      const userId = req.user.id;
      console.log(req.user)
      knex('posts')
        .select('*')
        .where({user_id: userId})
        .then(function (results) {
          console.log(results);
          res.render('lab', {
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
            userId: userId,
            posts: results,
            isAuth: isAuth,
          })
        })
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