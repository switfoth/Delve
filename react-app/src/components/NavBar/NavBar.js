import React from 'react';
import { NavLink } from 'react-router-dom';
import "./navbar.css"

const NavBar = ({ setAuthenticated }) => {
  return (
    <div id="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
