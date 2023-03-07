import React, {useState} from 'react';
import axios from 'axios';


function Home() {
  // string submitted to the backend from form
  const [guess, setGuess] = useState("");
  // string that is kinda a bool meaning if the word is correct
  const [gotit, setGotit] = useState(false);
  // int score
  const [score, setScore] = useState(0);
  // high score; displayed on successful guess of the word
  const [highScore, setHighScore] = useState("");

  // sends the submission to the backend for processing and updates whether you got it
  async function postguess (e) {
    e.preventDefault()

    // TODO: allow for saving of winning score
    setScore(score + 1)

    try {
      axios.post("http://localhost:4000/post_guess", {guess})
      .then((response) => {
        if (response.statusText === "OK"){
          // correct answer
          if (response.data === true){
            setGotit(true);
            let userinfo = localStorage.getItem("username");
            let wordSubmitted = guess;
            // sends the score to the server
            try {
              axios.post("http://localhost:4000/post_score", {score, userinfo, wordSubmitted})
              .then((response) => {
                if(response.data === true){
                  // TODO: try to get the high (lowest) score done by the user and store it in a variable
                  try {
                    axios.get(`http://localhost:4000/get_highscore/${userinfo}`)
                    .then((response) => {
                      console.log("set highscore?")
                      setHighScore(response.data);
                    })
                  }
                  catch (error) {
                    console.log(error)
                  }
                  alert(`sent score to server!`);
                }
                else {
                  alert(`please login to have your score saved!`);
                }
              })
            }
            catch (error) {
              console.log(error)
            }
          }
          else {
            setGotit(false);
          }
        }
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {
      gotit ?
       <div>
        <center>
          <p>you got it!</p>
          <p>your high score: {highScore}</p>
          <p><a href="/">run it back :0</a></p>
        </center>
        </div>:
      (<div className="Home">
      <center>
      <h1>Guess the magic word!</h1>
      <form onSubmit = {postguess}>
        <input type="text" placeholder="enter guess here" value = {guess} onChange = {(e) => setGuess(e.target.value)} />
        <button type="submit">SUBMIT YOUR GUESS</button>
      </form>
      <p>your word is {guess}</p>
        <p>score is {score}</p>
        {localStorage.getItem("username") !== "" ? 
        <div>
        <p>Hi, {localStorage.getItem("username")}</p>
        </div>: 
        <p>you are not logged in. sign up + log in to create an account!</p>}
      </center>
    </div>)
    }
    </>
  );
}

export default Home;
