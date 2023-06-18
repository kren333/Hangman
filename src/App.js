// import './App.css';
const React = require('react');
const {Routes, Route} = require('react-router-dom');
const Home = require('./pages/Home').default;
const About = require('./pages/About').default;
const Login = require('./pages/Login').default;
const Signup = require('./pages/Signup').default;
const Footer = require('./components/Footer').default;
const Navbar = require('./components/Navbar').default;


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
