import React from "react"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// component imports

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Game from '../src/components/Game';
import NavBar from './components/NavBar/NavBar';

// styling & image imports
import './App.css';
import StoneTexture from './assets/stone-texture.png';


function App() {
   return localStorage.getItem('token') ? (
      <Router>
         <div
            className="App"
            style={{ backgroundImage: `url(${StoneTexture})`, height: '100vh' }}
         >
            <NavBar />
            <h1>Testing</h1>
            <img src={Torch} alt="torch" className="torch-left" />
            <img src={Torch} alt="torch" className="torch-right" />
            <h2>CS MUD</h2>
            <Link to="/game">Game</Link>
            <Route path="/game" component={Game} />
         </div>
      </Router>
   ) : (
      <Router>
         <div
            className="App"
            style={{
               backgroundImage: `url(${StoneTexture})`,
               height: '100vh'
            }}
         >
            <h2>CS MUD</h2>
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
         </div>
      </Router>
   );
}

export default App
