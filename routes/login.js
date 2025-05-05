const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');

router.get('/', function( rea, res , next ) {
    res.render('login', { title: 'Login' });
});

router.use(express.json());
router.post('/', function(req, res) {
        loginController.loginUser(req, res);
    });

module.exports = router;