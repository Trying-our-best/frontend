import React from "react"

// library imports
import { NavLink, useHistory } from "react-router-dom"

// component imports
import Game from "../Game/Game"

// styling imports
import "./NavBar.scss"

const NavBar = props => {
  const history = useHistory()
  // function to destroy auth token and push user back to login page
  const logout = () => {
    localStorage.removeItem("token")
    history.push("/login")
    window.location.reload()
  }

  return props.isLoggedIn ? (
    <div className="navbar-wrapper">
      <h2 className="logo">oneStep Maze</h2>
      <div className="nav-links">
        <NavLink to={Game} className="navlink">
          Game
        </NavLink>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  ) : (
    <div className="navbar-wrapper">
      <h2 className="logo">oneStep Maze</h2>
      <div className="nav-links">
        <NavLink to="/login" className="navlink">
          Login{" "}
        </NavLink>
        <NavLink to="/register" className="navlink">
          Register{" "}
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
