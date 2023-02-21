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

// code to read in the secret password
var secretWord = '';
fs.readFile("thesecretword.txt", (err, inputD) => {
    if (err) throw err;
    secretWord = inputD.toString();
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

// goodbye message
process.on('exit', () => {
    console.log("byebye");
})

// confirmation message
app.get("/", cors(), async (req, res) => {
    res.send("this is working");
})

/* REQUEST HANDLERS */

// handles post requests for name submissions
app.post("/post_name", async (req, res) => {
    let {name} = req.body;
    console.log(`tried ${name}`)
    if(name === secretWord){
        console.log(`and was right!!!`)
        return res.send("");
    }
    console.log(`but word was ${secretWord}`)
    res.send("not");
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
        con.query(`SELECT COUNT(*) AS valid FROM users WHERE username = ? `, [username], function (err, result) {
            if (err) throw err;     
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

// listener
app.listen(port, () => {
    console.log(`listening at ${port}`);
})
