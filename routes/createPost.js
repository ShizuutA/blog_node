const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

const fetchController = require('../controllers/fetch');
const uploadController = require('../controllers/upload');

router.get('/', async function(req, res, next) {
    let { username, admin, pfpdata } = await fetchController.fetchSession(req, res);
    console.log('Admin:', admin);
    if (username && admin) { 
        res.render('createPost', { title: 'Create Post', user: username, admin: admin, pfpdata: pfpdata });
    }
    else {
        res.redirect('/');
    }
});

router.post("/", upload.array('image') ,function(req, res) {
    uploadController.createPost(req, res)
});

module.exports = router;