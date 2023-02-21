import React, {useState} from 'react';
import axios from 'axios';


function Home() {
  // string submitted to the backend from form
  const [name, setName] = useState("");
  // string that is kinda a bool meaning if the word is correct
  const [gotit, setGotit] = useState("not");

  // sends the submission to the backend for processing and updates whether you got it
  async function postname (e) {
    e.preventDefault()

    try {
      axios.post("http://localhost:4000/post_name", {name})
      .then((response) => {
        if (response.statusText === "OK"){
          setGotit(response.data);
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
        <p>your name is {name}</p>
        <p>you have {gotit} got it</p>
      </form>
      </center>
    </div>
  );
}

export default Home;
