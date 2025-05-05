var express = require('express');
var router = express.Router();

const session = require('express-session');

const dbConfig = require("../config/db.config.js");

const multer = require("multer");

const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    results.forEach(user => {
        router.get('/' + user.username, function(req, res, next) {
            if (session.user) {
                username = session.user;
                if (username == user.username) {
                    ownpage = true;
                }
                else {
                    ownpage = false;
                }
                if (session.admin) {
                admin = session.admin;
                }
                else {
                admin = false;
                }
            }
            else {
                username = false;
                admin = false;
                ownpage = false;
            }
    
            
            res.render('user', {user: user , admin: admin, username: username, ownpage: ownpage});
        });
        router.get('/' + user.username + '/settings', function(req, res, next) {
            if (session.user) {
                if (username == user.username) {
                    connection.query('SELECT * FROM users WHERE username = ?', [username], function (error, results, fields) {
                        if (error) throw error;
                        user = results[0];
                    });
                }
                else {
                    res.redirect('/users/' + user.username);
                }
                username = session.user;
            
            res.render('user-settings', {user: user , admin: admin, username: username });
            };

        router.use(express.json());
        router.use(express.urlencoded({ extended: true }));
        
        router.post('/' + user.username + '/settings', upload.single('image'), uploadController.uploadFiles ,function(req, res, next) {
            if (session.user) {
                if (username == user.username) {
                        connection.query('UPDATE users SET about = ? WHERE username = ?', [req.body.about, username], function (error, results, fields) {
                            if (error) throw error;
                            res.redirect('/users/' + username);
                    });
                }
             }
            });
        });
    });
  });

  
module.exports = router;
