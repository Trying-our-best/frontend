import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// component imports

<<<<<<< HEAD
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Game from "../src/components/Game/Game"
import NavBar from "./components/NavBar/NavBar"
=======
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Game from "../src/components/Game/Game";
import NavBar from "./components/NavBar/NavBar";
>>>>>>> 20f7db0cd27f1b9ff00a53645f2fc871cb005e4f

// styling & image imports
import "./App.css";
import StoneTexture from "./assets/stone-texture.png";
import Torch from "./assets/torch.png";

function App() {
  return localStorage.getItem("token") ? (
    <Router>
      <div
        className="App"
        //   style={{ backgroundImage: `url(${StoneTexture})`, height: "100vh" }}
      >
        <NavBar isLoggedIn={true} />
        <img src={Torch} alt="torch" className="torch-left" />
        <img src={Torch} alt="torch" className="torch-right" />
        <Link to="/game">Game</Link>
        <Route path="/game" component={Game} />
      </div>
    </Router>
  ) : (
    <Router>
      <div
        className="App"
        style={{
          //  backgroundImage: `url(${StoneTexture})`,
          height: "100vh"
        }}
      >
        <NavBar isLoggedIn={false} />
        <Redirect to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </Router>
  );
}

export default App;
