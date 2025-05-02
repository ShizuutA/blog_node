var express = require('express');
var router = express.Router();

const dbConfig = require("../config/db.config.js");
const session = require('express-session');

const multer = require("multer");
const upload = multer({ dest: '../resources/static/assets' })

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

router.get('/', upload.none() ,function(req, res, next) {
    if (session.user && session.admin) { 
        user = session.user;
        res.render('createPost', { title: 'Create Post', user: user });
    }
    else {
        res.redirect('/');
    }
});


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", upload.single("image"), function(req, res) {
    
    console.log(req.body);
    var title = req.body.title;
    var preview = req.body.preview;
    var content = req.body.content;    

    var images = [];

    console.log("Title: " + title);
    console.log("Content: " + content);

    if (title && content) {
        connection.query('INSERT INTO Posts (title, content, preview) VALUES (?, ?, ?)', [title, content, preview], function(error) {
            if (error) {
                console.error('Error executing query: ' + error.stack);
                return res.status(500).send('Error executing query');
            }
            connection.query('SELECT id FROM Posts desc limit 1', function(error, results) {
                if (error) {
                    console.error('Error executing query: ' + error.stack);
                    return res.status(500).send('Error executing query');
                }
                if (results.length > 0) {
                    const postId = results[0].id;
                    if (images.length > 0) {
                        images.forEach(element => {
                            const imgdata = element.getattribute("src");
                            connection.query('INSERT INTO Images (imgdata, post_id) VALUES (?, ?)', [imgdata, postId], function(error) {
                                if (error) {
                                    console.error('Error executing query: ' + error.stack);
                                    return res.status(500).send('Error executing query');
                                }
                            });
                        });
                    }
                    console.log("Post created with ID: " + postId + " and title: " + title);
                    res.redirect('/createPost?postsuccess=true');
                }
            });
        });
        connection.release;
    }

});

module.exports = router;