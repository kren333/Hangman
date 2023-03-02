import React, {useState} from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // was the login successful?
    const [loginMessage, setLoginMessage] = useState("");
    const [loginStatus, setLoginStatus] = useState(false);

    async function postValidation(e) {
        // TODO: figure out how to delete or nav to new page
        e.preventDefault()
        localStorage.setItem("username", "")
        try{
            axios.post("http://localhost:4000/post_validation", {username, password})
            .then((response) => {
            if (response.data === true){
                // TODO: successful login (how to connect this to a context + reducer usage?)
                setLoginStatus(true)
                localStorage.setItem("username", username)
                setLoginMessage("Successful login :)")
            }
            else {
                // TODO: failed login
                setLoginStatus(false)
                setLoginMessage("Failed login :/")
            }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {loginStatus ? (
            <div>
                <center>
                <p>Username: {localStorage.getItem("username")}</p>
                <p>You are logged in!</p>
                <p><a href="/">Go to Home</a></p>
                </center>
            </div>
        ) : (
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
                <p>{loginMessage}</p>
            </center>
        </div>
        )
        }
        </>
    )
}

export default Login;