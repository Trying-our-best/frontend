import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import Game from '../src/components/Game';
import './App.css';

function App() {
   return (
      <Router>
         <div className="App">
            <h2>Trying Our Best...</h2>
            <Link to="/login">Login </Link>
            <Link to="/register">Register </Link>
            <Link to="/game">Game</Link>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/game" component={Game} />
         </div>
      </Router>
   );
}

export default App;
