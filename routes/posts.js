const express = require('express');
const router = express.Router();

const fetchController = require("../controllers/fetch");
const uploadController = require("../controllers/upload");

router.get('/:postID', async function(req, res, next) {
    const postID = req.params.postID;

    const post = await fetchController.fetchPost(req, res, postID);
    const comments = await fetchController.fetchComments(req, res, postID);

    if (!post) {
        return res.status(404).render('404', { title: 'Post Not Found' });
    }
    const { username, admin, pfpdata } = await fetchController.fetchSession(req, res);

    res.render('postmodel', { post: post, user: username, admin: admin, pfpdata: pfpdata, comments: comments });
});

router.post('/:postID', async function(req, res, next) {
    const postID = req.params.postID;
    const { username, admin, pfpdata } = await fetchController.fetchSession(req, res);

    if (!username) {
        return res.redirect('/posts/' + postID);
    }
    uploadController.uploadComment(req, res, postID);
});


    
router.get('/', async function(req, res, next) {
    const { username, admin, pfpdata } = await fetchController.fetchSession(req, res);
    let pagenumber = req.query.page || 1;
    pagenumber = parseInt(pagenumber);
    if (isNaN(pagenumber)) {
        pagenumber = 1;
    }
    let limit = pagenumber * 5;
    let offset = limit - 5;
    if (pagenumber < 1) {
        return res.redirect('/posts?page=1');
    }

    const posts = await fetchController.fetchPosts(req, res, limit, offset);
    if (!posts) {
        return res.status(404).render('404', { title: 'Posts Not Found' });
    }
    res.render('postbrowser', {user: username , admin: admin, posts: posts });
});


module.exports = router;