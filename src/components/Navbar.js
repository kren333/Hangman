import React from 'react';

function Navbar() {
  function buttonhandler() {
    localStorage.setItem("username", "");
    window.location.reload();
  }
    return (
            <nav>
              <div>
                <a href="/">Home</a>
                <a href="/signup">Signup</a>
                <a href="/login">Login</a>
                <a href="/about">About</a>
                <form>
                  <button type="button" onClick={buttonhandler}>Logout</button>
                </form>
              </div>
            </nav>
    )
}

export default Navbar;
