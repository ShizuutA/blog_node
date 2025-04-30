var express = require('express');
const session = require('express-session');
var router = express.Router();

/* GET home page. */
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
  res.render('index', { title: 'Home',  user: user , admin: admin });
});

module.exports = router;
