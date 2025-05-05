const express = require('express');
const router = express.Router();

const uploadController = require('../controllers/upload');

router.get('/', function(req, res, next) {

    res.render('register', { title: 'Register' });
});

router.use(express.json());

router.post('/', function(req, res) {
    uploadController.createUser(req, res);
    });

module.exports = router;