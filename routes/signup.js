const express = require('express');
const knex = require('../db/knex');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', function (req, res, next) {
    const isAuth = req.isAuthenticated();
    res.render('signup', {
        title: 'アカウント登録',
        isAuth: 'isAuth',
    });
});

router.post('/', function post(req, res, next) {
    const isAuth = req.isAuthenticated();
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;

    knex('users')
        .where({ email: email })
        .select('*')
        .then(async function (result) {
            if (result.length !== 0) {
                res.render('signup', {
                    title: 'アカウント登録',
                    errorMessage: ['このユーザ名は既に使われています'],
                    isAuth: isAuth,
                })
            } else if (password === repassword) {
                const hashedPassword = await bcrypt.hash(password, 10);
                knex('users')
                    .insert({ email: email, password: hashedPassword })
                    .then(function () {
                        passport.authenticate('local', function (err, user, info) {
                            if (err) { return next(err); }
                            if (!user) { return res.redirect('/signin'); }
                            req.logIn(user, function (err) {
                                if (err) { return next(err); }
                                knex('sub_threads')
                                    .insert({ name: '自分の投稿', main_thread_id: 2, user_id: user.id })
                                    .then()
                                return res.redirect('/');
                            });
                        })(req, res, next)
                    })
                    .catch(function (err) {
                        console.error(err);
                        res.render('signup', {
                            title: 'アカウント登録',
                            errorMessage: [err.sqlMessage],
                            isAuth: isAuth,
                        });
                    });
            } else {
                res.render('signup', {
                    title: 'アカウント登録',
                    errorMessage: ['パスワードが一致しません'],
                    isAuth: isAuth,
                });
            }
        })
        .catch(function (err) {
            console.error(err);
            res.render('signup', {
                title: 'アカウント登録',
                errorMessage: [err.sqlMessage],
                isAuth: isAuth,
            });
        });
})

module.exports = router;