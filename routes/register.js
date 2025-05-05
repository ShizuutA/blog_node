const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

    res.render('register', { title: 'Register' });
});

router.use(express.json());

router.post('/', function(req, res) {


    if (password !== confirmpassword) {
        return res.status(400).render('register', {
            title: 'Register',
            error: 'Passwords do not match'
        });
    }
    else {
         connection.query('SELECT  username FROM Users WHERE username = ?', [username], function(error, results, fields) {
                if (error) {
                    console.error('Error executing query: ' + error.stack);
                    return res.status(500).send('Error executing query');
                }

                if (results.length > 0) {
                    return res.status(400).render('register', {
                        title: 'Register',
                        error: 'Username already exists'
                    });
                } 
                else {

                    password = sha1(password);
                    let avatar = generateAvatar(username);
                    connection.query('INSERT INTO Users (username, password, pfpdata) VALUES (?, ?, ?)', [username, password, avatar], function(error, results, fields) {
                        if (error) {
                            console.error('Error executing query: ' + error.stack);
                            return res.status(500).send('Error executing query');
                        }
                        res.redirect('/login');
                    });
                }
            });
            connection.release;
        }
    });

module.exports = router;