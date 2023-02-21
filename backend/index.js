const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");
var mysql = require('mysql');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

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
    console.log(username)
    console.log(password)
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
        con.query(`INSERT INTO users(username, password) VALUES (?,?) `, [username, password], function (err, result) {
            if (err) throw err;
            console.log('Row inserted:' + result.affectedRows);
        });
    });
})

// handles login requests
app.post("/post_validation", async (req, res) => {
    let {username} = req.body;
    let {password} = req.body;
    console.log(sql_pass)
    // TODO: figure out logic (send true if user/pass in db, false otherwise)
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
    });
    res.send(true);
})

// listener
app.listen(port, () => {
    console.log(`listening at ${port}`);
})
