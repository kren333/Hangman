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
            // TODO: figure out how to send a request to the server that sends score to db 
            // AND does it under the username logged in
            let userinfo = localStorage.getItem("username");
            try {
              axios.post("http://localhost:4000/post_score", {score, userinfo})
              .then((response) => {
                if(response.statusText==="OK"){
                  alert(`sent score to server!`);
                }
                else {
                  setGotit("popby");
                }
              })
            }
            catch (error) {
              console.log(error)
            }
          }
          else {
            setGotit("ddd");
          }
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
      </form>
      <p>your word is {name}</p>
        <p>you have {gotit} got it</p>
        <p>score is {score}</p>
        <p>{localStorage.getItem("username")}</p>
      </center>
    </div>
  );
}

export default Home;
