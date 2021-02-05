import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LoginFormModal from '../Login_Form_Modal';
import PartyFormModal from '../Party_Creation_Modal';
import ProfileFormModal from '../Profile_Modal';
import "./navbar.css"

const NavBar = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileFormModal user={sessionUser} />
        <PartyFormModal/>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal/>
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
