// helper function for rng rows
function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
  }

function numberLines (file) {
    var fs = require('fs'); 
    fileBuffer = fs.readFileSync(file); 
    to_string = fileBuffer.toString(); 
    split_lines = to_string.split("\n"); 
    return split_lines.length;
}

function connectToDB (sql_pass) {
    var mysql = require('mysql');
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: sql_pass,
        database: 'Hangman'
    });
}

function iwannainducesideeffects(options) {
  options.poopy = 5;
  return 6;
}

module.exports = {between, numberLines, connectToDB};
