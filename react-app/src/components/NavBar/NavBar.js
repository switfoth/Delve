import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import "./navbar.css"

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
      </>
    );
  }
  return (
    <div id="navbar">
      {sessionLinks}
    </div>
  );
}

export default NavBar;
