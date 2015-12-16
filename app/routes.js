var mysql = require('mysql');
var database = require('../config/database');

var connection = mysql.createConnection(database);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

module.exports = function(app) {
    // create a member
    app.post('/api/members', function(req, res){
        var member = {phoneNumber: req.body.phoneNumber, memberName: req.body.memberName};
        connection.query('INSERT INTO members SET ?', member, function(err, result) {
            //res.send(result);
            connection.query('SELECT * FROM members', function(err, rows){
                console.log(rows);
                res.send(rows);
            });
        });
    });

    // get all members
    app.get('/api/members', function(req, res){
        connection.query('SELECT * FROM members', function(err, rows){
            console.log(rows);
            res.send(rows);
        });

    });

    app.get('/api/members/:id',function(req, res){
        connection.query('SELECT * FROM members WHERE id='+req.params.id, function(err, rows){
            console.log(rows);
            res.send(rows);
        });
    });
    app.put('/api/members/:id', function(req, res){
        var mid = req.params.id;
        var member = {phoneNumber: req.body.phoneNumber, memberName: req.body.memberName};
        connection.query('UPDATE members SET ? WHERE id = '+mid, member, function(err, result){
        })
    });
    app.delete('/api/members/:id', function(req, res){
       connection.query('DELETE FROM members WHERE id ='+req.params.id, function(err, result){
           connection.query('SELECT * FROM members', function(err, rows){
               console.log(rows);
               res.send(rows);
           });
       });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};
