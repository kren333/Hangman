/* SETUP */

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const fs = require("fs");
var mysql = require('mysql');
const utils = require("./utils.js")

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

/* SETUP/CALLBACK INSTANTIATIONS */

// code to read in the secret password
var secretWord = '';
var file = 'thesecretword.txt';
var numberLines = utils.numberLines(file);
console.log(numberLines)
;(async () => {
    const nthline = require('nthline'),
      filePath = file,
      rowIndex = utils.between (0, await utils.numberLines(file) - 1)
   
      secretWord = await nthline(rowIndex, filePath);
      console.log(`secret word is ${secretWord}`)
  })()

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

/* REQUEST HANDLERS */

// confirmation message
app.get("/", cors(), async (req, res) => {
    res.send("this is working");
})

// TODO: get list of high scores (top x + username of each high score)

// get high score variable given user information from sql table
app.get("/get_highscore/:user", cors(), async (req, res) => {
    let {user} = req.params;
    var con = utils.connectToDB(sql_pass);
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result)  {
            if (err) throw err;
            console.log(result)
        });
        console.log()
    })
    res.send(user);
})

// handles post requests for name submissions
app.post("/post_guess", async (req, res) => {
    let {guess} = req.body;
    console.log(`tried ${guess}`)
    if(guess === secretWord){
        console.log(`and was right!!!`)
        // TODO: do a new magic word
        ;(async () => {
            const nthlinereset = require('nthline'),
              filePath = file,
              rowIndex = utils.between(0, utils.numberLines(file) - 1)
           
              secretWord = await nthlinereset(rowIndex, filePath);
              console.log(`new secret word is ${secretWord}`)
          })()
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
    var con = utils.connectToDB(sql_pass);
    
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
    var con = utils.connectToDB(sql_pass);

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
    let {wordSubmitted} = req.body;
    console.log(req.body)
    // connect to sql db
    var con = utils.connectToDB(sql_pass);
    
    con.connect(function(err) {
        if (err) throw err;
        console.log("connected!")
        // insert score + username combo into the scores db, IF user is logged in
        if(userinfo !== '') {
            con.query(`INSERT INTO scores(score, username, submittedWord) VALUES (?,?,?) `, [score, userinfo, wordSubmitted], function (err, result) {
                if (err) throw err;
                console.log('Row inserted:' + result.affectedRows);
                return res.send(true)
            });
        }
        else {
            console.log("user was not logged in")
            return res.send(false);
        }
    });
})

// listener
app.listen(port, () => {
    console.log(`listening at ${port}`);
})
