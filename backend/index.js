const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const fs = require("fs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

// code to read in the secret password
var secretWord = '';
fs.readFile("thesecretword.txt", (err, inputD) => {
    if (err) throw err;
    secretWord = inputD.toString();
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
    // TODO: figure out logic (put the user/pass combo into db and let user know)
})

// handles login requests
app.post("/post_validation", async (req, res) => {
    let {username} = req.body;
    let {password} = req.body;
    // TODO: figure out logic (send true if user/pass in db, false otherwise)
    req.send(true);
})

// listener
app.listen(port, () => {
    console.log(`listening at ${port}`);
})
