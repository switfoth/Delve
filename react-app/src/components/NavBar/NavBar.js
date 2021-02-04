import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import MainPage from '../MainPage/index'
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
          <li>
            <LogoutButton setAuthenticated={setAuthenticated} />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
