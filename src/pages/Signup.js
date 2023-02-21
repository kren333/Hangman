import React, {useState} from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function postUserInfo(e) {
        // TODO: figure out how to delete or navigate to a new page
        e.preventDefault()

        try{
            // TODO: make a new post request for user and pass that interacts with the nosql or mysql database
            // rn all this will do is set the username equal to "OK"
            // it should probably just return nothing or route you to a new page
            axios.post("http://localhost:4000/post_user_info", {username, password})
            .then((response) => {
              if (response.statusText === "OK"){
                setPassword("idkman");
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
            </center>
        </div>
    )
}

export default Signup;