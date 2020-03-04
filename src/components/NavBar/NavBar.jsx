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
        <div>
            <NavLink to={Game} />
            <button onClick={logout}>Logout</button>
        </div>
     );
}

export default NavBar;