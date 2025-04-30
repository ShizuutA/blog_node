var express = require('express');
var router = express.Router();

const session = require('express-session');

router.post('/', function(req, res, next) {
  delete session.user; // Delete the user session
    res.redirect('/');
  });

module.exports = router;