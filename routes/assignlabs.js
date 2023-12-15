const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
        knex('users')
          .select('*')
          .then(function (usersResults) {
            knex('labs')
              .select('*')
              .then(function (labsResults) {
                // console.log(labsResults);
                res.render('assignlabs', {
                  title: 'Leaf',
                  users: usersResults,
                  labs: labsResults,
                  isAuth: isAuth,
                })
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
  const isAuth = req.isAuthenticated();

  if(req.body.addLab != undefined) {
    const labsName = req.body.labs_name;
  
    knex('labs')
      .select('*')
      .where({ 'name': labsName })
      .then(function (results) {
        if(results.length == 0) {
          knex('labs')
            .insert({ name: labsName, exist: 1 })
            .then(function () {
              res.redirect('/manage/assignlabs');
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
        } else if(results[0].exist == 0) {
          knex('labs')
            .where({ 'name': labsName })
            .update({ exist: 1 })
            .then(function() {
              res.redirect('/manage/assignlabs');
            })
        } else {
          res.redirect('/manage/assignlabs');
        }
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
  } else if(req.body.removeLab != undefined) {
    const labCheck = req.body.lab_check

    if(typeof(labCheck) == 'object') {
      for(labName of labCheck) {
        knex('labs')
          .where({ 'name': labName })
          .update({ 'exist': 0 })
          .then(function () {
            res.redirect('/manage/assignlabs');
          })
      }
    } else if(typeof(labCheck) == 'string') {
      knex('labs')
        .where({ 'name': labCheck})
        .update({ 'exist': 0})
        .then(function () {
          res.redirect('/manage/assignlabs');
        })
    }
  } else if(req.body.assignLab != undefined) {
    const assignMembers = req.body.assign_members;
    const labName = req.body.lab_name;

    if(typeof(assignMembers) == 'object') {
      for(member of assignMembers) {
        // knex('')
        //   .where({ 'name': labName })
        //   .update({ 'exist': 0 })
        //   .then(function () {
        //     res.redirect('/manage/assignlabs');
        //   })
      }
    } else if(typeof(assignMembers) == 'string') {
      knex('labs')
        .where({ 'name': labName})
        .update({ 'exist': 0})
        .then(function () {
          res.redirect('/manage/assignlabs');
        })
      knex('users')
        .select('*')
        .where({ 'email': assignMembers, 'lab_id': null})
        
        .then(function (results) {
          
        })
    }
    console.log(req.body)
    res.redirect('/manage/assignlabs')
  } else {
    res.redirect('/manage/assignlabs')
  }
    
});

module.exports = router;