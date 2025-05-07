var express = require('express');
var router = express.Router();

const session = require('express-session');

const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

const fetchController = require("../controllers/fetch");


router.get('/:profileUsername', async function(req, res, next) {
    try {
        const { profileUsername } = req.params;
        const { username , admin, pfpdata } = await fetchController.fetchSession(req, res);
        const user = await fetchController.fetchUser(req, res, profileUsername);
        const userOwnPage = (username === user.username);

        if (!user) {
            return res.status(404).render('404', { title: 'User Not Found' });
        }

        res.render('user', { user: user, admin: admin, username: username, pfpdata: pfpdata, userOwnPage: userOwnPage });
    }
    catch (error) {
        console.error('Error fetching user:', error);
    }
});


router.get('/:profileUsername/settings', async function(req, res, next) {
    try {
        const { profileUsername } = req.params;
        const { username , admin, pfpdata } = await fetchController.fetchSession(req, res);
        const user = await fetchController.fetchUser(req, res, profileUsername);
        const userOwnPage = (username === user.username);

        if (!user) {
            return res.status(404).render('404', { title: 'User Not Found' });
        }

        if (!userOwnPage) {
            return res.redirect('/users/' + user.username);
        }
        res.render('user-settings', { user: user, admin: admin, username: username, pfpdata: pfpdata, userOwnPage: userOwnPage });
    }
    catch (error) {
        console.error('Error fetching user:', error);
        next(error);
    }
});
    
router.post('/:username/settings', upload.single('image'), async function(req, res, next) {
    try {
        const { username } = req.params;
        if (req.file) {
            await uploadController.uploadPfp(req, res, username);
        }
        await uploadController.updateUserInfo(req, res, username);
        res.redirect('/users/' + username);
    }
    catch (error) {
        console.error('Error updating user:', error);
        next(error)
    }
});

 
  
module.exports = router;
