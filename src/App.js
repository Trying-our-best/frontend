import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// component imports
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import Game from '../src/components/Game';
import NavBar from './components/NavBar/NavBar'

// styling & image imports
import './App.css'
import Torch from './assets/torch.png'



function App() {

   const data = "data:image/png;base64,iVBORw-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"
   return localStorage.getItem('token') ? (
      <Router>
         <div className="App">
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
         <div className="App">
            <h2>CS MUD</h2>
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
         </div>
      </Router>
   );
}

export default App;
