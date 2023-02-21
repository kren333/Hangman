import React, {useState} from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function postValidation(e) {
        // TODO: figure out how to delete or nav to new page
        e.preventDefault()

        try{
            // TODO: make a new post request for user and pass that interacts with the nosql or mysql database
            // rn all this will do is set the username equal to "OK"
            axios.post("http://localhost:4000/post_validation", {username, password})
            .then((response) => {
            if (response.statusText === "OK"){
                // TODO: get login validation logic put in
            }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div classname="Login">
            <center>
                <h1>Sign in to your account!</h1>
                <form onSubmit={postValidation}>
                    <label>
                        Username
                        <input type="text" title="asdf" placeholder="username" value = {username} onChange = {(e) => setUsername(e.target.value)}/><br></br>
                    </label>
                    <label>
                        Password
                        <input type="password" placeholder="password" value = {password} onChange = {(e) => setPassword(e.target.value)}/><br></br>
                    </label>
                    <button type="submit">Login</button>
                </form>
            </center>
        </div>
    )
}

export default Login;