var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');

var dbConnPool = mysql.createPool({
    host: 'localhost',
    user: 'footytrivia',
    password: 'footytrivia_123',
    database: 'footytrivia_db'
});

app.get('/getQuestions', cors(), function(req, resp) {
    /* 
    1) Get array of 10 Random Questions
    1.1: Get 10 random numbers
    1.2: Read DB and get questions with id = the 10 nos.
    1.3: Convert DB response to JSON array
    2) Send the array as response
    */
    var randomNos = [];
    while (randomNos.length != 10) {
        var randomNo = Math.floor(Math.random() * Math.floor(20));
        if(!randomNos.includes(randomNo)) {
            randomNos.push(randomNo);
        }
    }

    dbConnPool.getConnection(function(err, conn) {
        if(err) throw err;
        var query = 'select id, question, opt1, opt2, opt3, opt4 from questions where id in (' + randomNos + ');';
        var ques = conn.query(query, function(err, rows, fields) {
            if(err)
                throw err;
            console.log(rows);
            resp.json(rows);
        });
    });
});

app.get('/checkAnswer', cors(), function(req, resp) {
    /* 
    1) Get ID and Given answer from request.
    2) Query db with id and answer 
    If wrong, null will be returned
     */
    dbConnPool.getConnection(function(err, conn) {
        if(err) throw err;
        var query = 'select id from questions where id = ' + req.query.id + ' and answer = "' + req.query.answer + '";';
        var ques = conn.query(query, function(err, rows, fields) {
            if(err){
                throw err;
            }
            console.log(rows);
            if(rows.length != 0) {
                resp.json('{id: true}');
            }
            else {
                resp.json('{id: false}');
            }
        });
    });
});

app.listen(3000, () => console.log("Listening on port 3000..."));