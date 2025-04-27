var express = require('express');
var router = express.Router();

var session = require('express-session');

var sha1 = require('js-sha1');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Blog_Romain'
});

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.use(express.json());
router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.connect(function(err) {
        if (err) {
            console.error('Error connecting: ' + err.stack);
            return;
        }
        console.log('Connected as id ' + connection.threadId);

        password = sha1(password);

        connection.query('SELECT * FROM Users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) {
                console.error('Error executing query: ' + error.stack);
                return res.status(500).send('Error executing query');
            }

            if (results.length > 0) {
                session.user = username;
                res.redirect('/');
            } else {
                res.status(401).render('login', {
                    title: 'Login',
                    error: 'Invalid username or password'
                });
            }
        });
    });
});

module.exports = router;