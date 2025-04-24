var mysql = require('mysql');

var sha1 = require('js-sha1');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'romain',
    password: 'cielpass',
    database: 'Blog_Romain'
});


connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

console.log(sha1('4321'));