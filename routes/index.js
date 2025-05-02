var express = require('express');
const session = require('express-session');
var router = express.Router();

const dbConfig = require("../config/db.config.js");

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
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

  connection.query('SELECT * FROM posts ORDER BY ID DESC limit 2', function (error, results, fields) {
    if (error) throw error;
    res.render('index', { title: 'Home', posts: results, user: user , admin: admin });
  });
}
);
module.exports = router;
