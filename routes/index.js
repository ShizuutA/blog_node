const express = require('express');
const router = express.Router();

const fetchController = require('../controllers/fetch');

router.get('/', async function(req, res, next) {
    const post_numbers = 2;
    const { username, admin, pfpdata } = await fetchController.fetchSession(req, res);
    const posts = await fetchController.fetchPosts(req, res, post_numbers);

    res.render('index', { title: 'Home', posts: posts, username: username , admin: admin , pfpdata: pfpdata});
});
module.exports = router;
