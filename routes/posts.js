var express = require('express');
var router = express.Router();

const session = require('express-session');

const dbConfig = require("../config/db.config.js");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.query('SELECT * FROM posts ORDER BY ID', function (error, results, fields) {
    if (error) throw error;
    results.forEach(post => {
        router.get('/' + post.ID, function(req, res, next) {
            if (session.user) {
                user = session.user;
                if (session.admin) {
                admin = session.admin;
                }
                else {
                admin = false;
                }
            }
            else {
                user = false;
                admin = false;
            }
    
            
            res.render('postmodel', { post: post, user: user , admin: admin, });
        });
    });
});

router.get('/', function(req, res, next) {

    if (session.user) {
        user = session.user;
        if (session.admin) {
        admin = session.admin;
        }
        else {
        admin = false;
        }
    }
    else {
        user = false;
        admin = false;
    }
    
    connection.query('SELECT * FROM posts ORDER BY ID DESC limit 10', function (error, results, fields) {
    if (error) throw error;
    res.render('postbrowser', {user: user , admin: admin, posts: results });
    });
});


module.exports = router;