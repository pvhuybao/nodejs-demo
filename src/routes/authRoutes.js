const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
function router(nav) {
    authRouter.route('/signUp').post((req, res) => {

        const { username, password } = req.body;
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function addUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                const db = client.db(dbName);

                const col = db.collection('users');
                const user = { username, password };
                const results = await col.insertOne(user);
                debug(results);
                req.login(results.ops[0], () => {
                    res.redirect('/auth/profile');
                });
            } catch (err) {
                debug(err);
            }
        }());

        //create user
        // req.login(req.body, () => {
        //     res.redirect('/auth/profile');
        // });
    });

    authRouter.route('/signin')
        .get((req, res) => {
            res.render('signin', {
                nav,
                title: 'signIn'
            });


        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }));

    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;