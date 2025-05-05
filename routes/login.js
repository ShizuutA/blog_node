var express = require('express');
var router = express.Router();

const dbConfig = require("../config/db.config.js");

var session = require('express-session');

var sha1 = require('js-sha1');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.use(express.json());
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

        password = sha1(password);

        connection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) {
                console.error('Error executing query: ' + error.stack);
                return res.status(500).send('Error executing query');
            }

            if (results.length > 0) {
                session.user = username;
                if (results[0].pfpdata) {
                    session.pfpdata = results[0].pfpdata;
                }
                else {
                    session.pfpdata = '';
                }
                if (results[0].rights == "Admin") {
                   session.admin = true;
                }
                res.redirect('/');
            } else {
                res.status(401).render('login', {
                    title: 'Login',
                    error: 'Invalid username or password'
                });
            }
            
        });
        connection.release;
        
    });

module.exports = router;