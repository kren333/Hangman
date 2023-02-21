import React, {useState} from 'react';
import axios from 'axios';

function Signup() {
    // hooks for username and password; set via form submission
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // potential feedback message displayed when repeat username is entered
    const [dummy, setDummy] = useState("");

    async function postUserInfo(e) {
        e.preventDefault()

        try{
            // attempt to pass user info to register with db
            axios.post("http://localhost:4000/post_user_info", {username, password})
            .then((response) => {
              if (response.data === true) {
                // display welcome message
                setDummy("Registered your info!");
                // TODO: code to link to new page w/login done
              }
              if (response.data === false){
                // display warning message
                setDummy("Username has already been taken; try again");
              }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div classname="Signup">
            <center>
                <h1>Make an account!</h1>
                <form onSubmit={postUserInfo}>
                    <label>
                        Username
                        <input type="text" title="asdf" placeholder="username" value = {username} onChange = {(e) => setUsername(e.target.value)}/><br></br>
                    </label>
                    <label>
                        Password
                        <input type="password" placeholder="password" value = {password} onChange = {(e) => setPassword(e.target.value)}/><br></br>
                    </label>
                    <button type="submit">Submit Your Registration</button>
                </form>
                <p>{dummy}</p>
            </center>
        </div>
    )
}

export default Signup;