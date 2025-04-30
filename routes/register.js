var express = require('express');
var router = express.Router();

var sha1 = require('js-sha1');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cielpass',
    database: 'Blog_Romain'
});


router.get('/', function(req, res, next) {

    res.render('register', { title: 'Register' });
});

router.use(express.json());

router.post('/', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var confirmpassword = req.body.confirmpassword;

    if (password !== confirmpassword) {
        return res.status(400).render('register', {
            title: 'Register',
            error: 'Passwords do not match'
        });
    }
    else {
         connection.query('SELECT  username FROM Users WHERE username = ?', [username], function(error, results, fields) {
                if (error) {
                    console.error('Error executing query: ' + error.stack);
                    return res.status(500).send('Error executing query');
                }

                if (results.length > 0) {
                    return res.status(400).render('register', {
                        title: 'Register',
                        error: 'Username already exists'
                    });
                } 
                else {

                    password = sha1(password);

                    connection.query('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], function(error, results, fields) {
                        if (error) {
                            console.error('Error executing query: ' + error.stack);
                            return res.status(500).send('Error executing query');
                        }
                        res.redirect('/login');
                    });
                }
            });
            connection.release;
        }
    });
module.exports = router;