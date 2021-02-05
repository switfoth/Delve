import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import LoginFormModal from '../Login_Form_Modal';
import ItemFormModal from '../Item_Modal';
import MemberFormModal from '../Member_Creation_Modal';
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
        <ItemFormModal/>
        <MemberFormModal/>
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
