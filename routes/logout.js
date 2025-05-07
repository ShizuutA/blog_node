var express = require('express');
var router = express.Router();

const session = require('express-session');

router.get('/', function(req, res, next) {
    delete req.session.username; // Delete the user session
    res.redirect('/');
  });

module.exports = router;