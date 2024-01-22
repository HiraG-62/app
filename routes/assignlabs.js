const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const render = require('../public/javascripts/rendarData');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
  
    if (isAuth) {
        knex('users')
          .select('*')
          .then(function (usersResults) {
            knex('labs')
              .select('*')
              .then(function (labsResults) {

                res.render('assignlabs', render.getRenderData(isAuth, 'manage', {labs: labsResults ,users: usersResults }));
            })
          })
          .catch(function (err) {
            console.error(err);
            res.render('index', {
              title: 'Leaf',
              userId: userId,
              isAuth: isAuth,
              mainThread: 'home',
              subThreads: [ 'トップページ', '全体連絡', 'カレンダー' ],
              subThreadIndex: '0'
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
    const labId = knex('labs').select('id').where({ 'name': labName })

    if(typeof(assignMembers) == 'object') {
      for(member of assignMembers) {
        knex('users', 'labs')
          .where({ 'users.email': member }, { 'labs.name': labName })
          .update({ 'users.lab_id': labId })
          .then()
        }
    } else if(typeof(assignMembers) == 'string') {
      knex('labs')
        .select('id')
        .where({ 'name': labName})
        .then(function (results) {
          knex('users')
            .where({ 'email': assignMembers })
            .update({ 'lab_id': results[0].id })
            .then()
        })
    }
  } else {

  }
  res.redirect('/manage/assignlabs');
});

module.exports = router;