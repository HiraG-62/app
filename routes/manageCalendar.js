const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const render = require('../public/javascripts/rendarData');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();

    res.render('manageCalendar', res.render('manageCalendar', render.getRenderData(isAuth, 'manage', 1)))
});

router.post('/', function(req, res, next) {

});

module.exports = router;