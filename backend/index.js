/* SETUP */

const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");
var mysql = require('mysql');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

/* SETUP/CALLBACK INSTANTIATIONS */

var poopy = '';
;(async () => {
    const nthline = require('nthline'),
      filePath = 'thesecretword.txt',
      rowIndex = 0
   
    poopy = await nthline(rowIndex, filePath);
  })()

// code to read in the secret password
var secretWord = '';
fs.readFile("thesecretword.txt", (err, inputD) => {
    if (err) throw err;
    secretWord = inputD.toString();
    console.log(poopy)
})

// read sql password from git-ignored file
var sql_pass = '';
fs.readFile("password.txt", (err, inputD) => {
    if (err) throw err;
    sql_pass = inputD.toString();
})

const { EventEmitter } = require('events');
const emitter = new EventEmitter();

// secret word message to console output
emitter.on("somethinghappened", () => 
    console.log("you guessed the magic word!")
);

// confirmation message
app.get("/", cors(), async (req, res) => {
    res.send("this is working");
})

// TODO: resets the magic word (to be called on success)
async function resetPassword() {

}

/* REQUEST HANDLERS */

// handles post requests for name submissions
app.post("/post_name", async (req, res) => {
    let {name} = req.body;
    console.log(`tried ${name}`)
    if(name === secretWord){
        console.log(`and was right!!!`)
        // TODO: do a new magic word
        return res.send(true);
    }
    console.log(`but word was ${secretWord}`)
    res.send(false);
})

// handles signup submissions
app.post("/post_user_info", async (req, res) => {
    let {username} = req.body;
    let {password} = req.body;
    console.log(req.body)
    // connect to sql db
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: sql_pass,
        database: 'Hangman'
    });
    
    con.connect(function(err) {
        if (err) throw err;
        // TODO: query into database; if the username exists send a message and don't insert
        con.query(`SELECT COUNT(*) as valid FROM users WHERE username = ? `, [username], function (err, result) {
            if (err) throw err;
            console.log(result)     
            if(result[0].valid === 0){
                // insert into the db if the username is unique
                con.query(`INSERT INTO users(username, password) VALUES (?,?) `, [username, password], function (err, result) {
                    if (err) throw err;
                    console.log('Row inserted:' + result.affectedRows);
                    res.send(true);
                });
            }
            else{
                console.log("bad user")
                res.send(false);
            }    
        });
    });
})

// handles login requests
app.post("/post_validation", async (req, res) => {
    let {username} = req.body;
    let {password} = req.body;

    // connect to sql db
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: sql_pass,
        database: 'Hangman'
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(`SELECT COUNT(*) AS valid FROM users WHERE username = ? AND password = ?`, [username, password], function (err, result) {
            if (err) throw err;
            console.log(result[0].valid > 0)
            // if valid login return true; otherwise false
            return res.send(result[0].valid > 0);
        });
    });
})

// handles signup submissions
app.post("/post_score", async (req, res) => {
    let {userinfo} = req.body;
    let {score} = req.body;
    console.log(req.body)
    // connect to sql db
    var con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: sql_pass,
        database: 'Hangman'
    });
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("connected!")
        // insert score + username combo into the scores db
        con.query(`INSERT INTO scores(score, username) VALUES (?,?) `, [score, userinfo], function (err, result) {
            if (err) throw err;
            console.log('Row inserted:' + result.affectedRows);
            res.send(true);
        });
    });
})

// listener
app.listen(port, () => {
    console.log(`listening at ${port}`);
})
