import React, {useState} from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // was the login successful?
    const [loginStatus, setLoginStatus] = useState("");

    async function postValidation(e) {
        // TODO: figure out how to delete or nav to new page
        e.preventDefault()

        try{
            axios.post("http://localhost:4000/post_validation", {username, password})
            .then((response) => {
            if (response.data === true){
                // TODO: successful login
                setLoginStatus("Successful login :)")
            }
            else {
                // TODO: failed login
                setLoginStatus("Failed login :/")
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
                <p>{loginStatus}</p>
            </center>
        </div>
    )
}

export default Login;