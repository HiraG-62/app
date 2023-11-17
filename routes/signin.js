const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/', function (req, res, next) {
    console.log(req.body.email);
    const isAuth = req.isAuthenticated();
    res.render('signin', {
        title: 'Sign in',
        errorMessage: req.flash('error'),
        isAuth: isAuth,
    });
});

router.post('/', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true,
    }
))

module.exports = router;