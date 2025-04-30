var express = require('express');
var router = express.Router();

const session = require('express-session');

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Blog_Romain'
});


router.get('/', function(req, res, next) {
    if (session.user && session.admin) { 
        user = session.user;
        res.render('createPost', { title: 'Create Post', user: user });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;