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

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    results.forEach(user => {
        router.get('/' + user.username, function(req, res, next) {
            if (session.user) {
                username = session.user;
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
            }
    
            
            res.render('user', {user: user , admin: admin, username: username, });
        });
    });
  });

  
module.exports = router;
