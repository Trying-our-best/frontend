import React from 'react';

// library imports
import { NavLink } from 'react-router-dom'

// component imports
import Game from '../Game'

// styling imports
import './NavBar.scss'


const NavBar = () => {

    // function to destroy auth token and push user back to login page
    const logout = () => { 

    }

    return (
        <div className="navbar-wrapper">
            <h2 className="logo">Trying Our Best MUD</h2>
            <div className="nav-links">
                <NavLink to={Game} className="navlink">Game</NavLink>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
     );
}

export default NavBar;