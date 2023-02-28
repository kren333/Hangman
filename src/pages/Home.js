import React, {useState} from 'react';
import axios from 'axios';


function Home() {
  // string submitted to the backend from form
  const [name, setName] = useState("");
  // string that is kinda a bool meaning if the word is correct
  const [gotit, setGotit] = useState("not");
  // int score
  const [score, setScore] = useState(0);

  // sends the submission to the backend for processing and updates whether you got it
  async function postname (e) {
    e.preventDefault()

    // TODO: allow for saving of winning score
    setScore(score + 1)

    try {
      axios.post("http://localhost:4000/post_name", {name})
      .then((response) => {
        if (response.statusText === "OK"){
          if (response.data === true){
            setGotit("");
          }
          else {
            setGotit("not");
          }
        }
        if (gotit===""){
          // TODO: figure out how to send a request to the server that sends score to db 
          // AND does it under the username logged in
          // axios.post("http:")
        }
      })
    }
    catch (error) {
      console.log("error")
    }
  }

  return (
    <div className="Home">
      <center>
      <h1>Guess the magic word!</h1>
      <form onSubmit = {postname}>
        <input type="text" placeholder="enter guess here" value = {name} onChange = {(e) => setName(e.target.value)} />
        <button type="submit">SUBMIT YOUR GUESS</button>
        <p>your word is {name}</p>
        <p>you have {gotit} got it</p>
        <p>score is {score}</p>
      </form>
      </center>
    </div>
  );
}

export default Home;
