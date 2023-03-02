import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import About from './pages/About.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';


function App() {
  return (
    <>
      <Navbar/>
      <Routes>  
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;
