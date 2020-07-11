var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

app.use(bodyParser.raw());

var dbConnPool = mysql.createPool({
    host: 'localhost',
    user: 'footytrivia',
    password: 'footytrivia_123',
    database: 'footytrivia_db'
});

app.post('/login', cors(), function(req, resp) {
    dbConnPool.getConnection(function(err, conn) {
        if(err)
            return resp.json({status: 500, err: err.message});
// Query the details first, then check password
// This is just for time being: to be changed soon
        // var pass_query = "select username"
        var query = "select u.user_id, \
                            u.username, \
                            u.email_id, \
                            u.creation_time, \
                            u.password, \
                            s.score_id, \
                            s.score, \
                            s.score_time \
                    from user as u left outer join score as s  \
                            on u.user_id = s.user_id \
                         where u.email_id = ?";
                    //  and \
                        //   u.password = ?";
        console.log("DEBUG: req.body = ");
	console.log(req.body);
	  var ques = conn.query(query, [req.body.email_id],function(err, rows, fields) {
            if(err) {
                resp.json({status: 500, err: err.message});
            }
            else {
                if(rows.length != 0) {
                // i.e., already registered user
                // Either by google, or by normal
                // So, now check password
                    if(bcrypt.compareSync(req.body.password, rows[0]["password"])) {
                        // Correct password
                        delete rows[0]["password"];
                        resp.json({status: 200, response: rows});
                    }
                    else {
                        resp.json({status: 500, err: "Incorrect Username/Password"});
                    }
                }
                else if(rows.length == 0 && req.body.provider != null) {
                    // i.e., non registered user, logging in via google
                    // So this is his first login, register him
                    var query2 = 'insert into user(username, email_id, provider) values(?, ?, ?);';
                    var ques = conn.query(query2, [req.body.username, req.body.email_id, req.body.provider],function(err, rows2, fields) {
                        if(err) {
                            resp.json({status: 500, err: err.message});
                        }
                        else {
                            resp.json({status: 200, response: {
                                                            user_id: rows2.insertId,
                                                            username: req.body.username,
                                                            email_id: req.body.email_id,
                                                            creation_time: Date.now()}});
                        }
                    });
                }
            }
        });
        conn.release();
    });
});

app.post('/register', cors(), function(req, resp) {
    dbConnPool.getConnection(function(err, conn) {
        if(err)
            return resp.json({status: 500, err: err.message});
        var query = 'insert into user(username, email_id, password) values(?, ?, ?);';
        var ques = conn.query(query, [req.body.username, 
                                      req.body.email_id,
                                      bcrypt.hashSync(req.body.password, 10)],function(err, rows, fields) {
            if(err) {
                resp.json({status: 500, err: err.message});
            }
            else {
                resp.json({status: 200, response: {user_id: rows.insertId}});
            }
        });
        conn.release();
    });
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
        var randomNo = Math.floor(Math.random() * (19 - 1) + 1);
        if(!randomNos.includes(randomNo)) {
            randomNos.push(randomNo);
        }
    }

    dbConnPool.getConnection(function(err, conn) {
        if(err) throw err;
        var query = 'select id, question, opt1, opt2, opt3, opt4 from questions where id in (' + randomNos + ');';
        var ques = conn.query(query, function(err, rows, fields) {
            if(err) {
                resp.json({status: 500, err: err.message});
            }
            else
                resp.json({status: 200, response: rows});
        });
        conn.release();
    });
});

app.get('/checkAnswer', cors(), function(req, resp) {
    /* 
    1) Get ID and Given answer from request.
    2) Query db with id and answer 
    If wrong, null will be returned
     */
    dbConnPool.getConnection(function(err, conn) {
        if(err)
            return resp.json({status: 500, err: err.message});
        var query = 'select id, answer from questions where id = ' + req.query.id + ';';
        var ques = conn.query(query, function(err, rows, fields) {
            if(err) {
                resp.json({status: 500, err: err});
            }
            else {
                console.log(rows);
                var respArr = [];
                if(rows[0].answer == req.query.answer) {
                    respArr.push('true');
                }
                else {
                    respArr.push('false');
                }
                respArr.push(JSON.stringify(rows));
                resp.json({status: 200, response: respArr});
            }
        });
        conn.release();
    });
});

app.post('/saveScore', cors(), function(req, resp) {
    dbConnPool.getConnection(function(err, conn) {
        if(err) 
             return resp.json({status: 500, err: err.message});
        var query = 'insert into score(user_id, score) values(?, ?);';
        var ques = conn.query(query, [req.query.user_id, req.query.score],function(err, rows, fields) {
            if(err) {
                if(err.errno == 1062)
                    resp.json({status: 500, err: "Username or Email already exists"});
                else
                    resp.json({status: 500, err: err.message});
            }
            else { 
                resp.json({status: 200, response: rows});   
            }
        });
        conn.release();
    });
});

app.listen(3000, () => console.log("Listening on port 3000..."));
