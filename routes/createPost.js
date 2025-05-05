const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

const fetchController = require('../controllers/fetch');
const uploadController = require('../controllers/upload');

router.get('/', upload.none() ,function(req, res, next) {
    let { username, admin, pfpdata } = fetchController.fetchSession(req, res);

    if (username && admin) { 
        res.render('createPost', { title: 'Create Post', username: username });
    }
    else {
        res.redirect('/');
    }
});

router.post("/", upload.array('image') ,function(req, res) {
    uploadController.createPost(req, res)
});

module.exports = router;