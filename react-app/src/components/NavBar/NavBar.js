import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import LoginFormModal from '../Login_Form_Modal';
import ProfileFormModal from '../Profile_Modal';
import { logout } from '../../store/session';
import "./navbar.css"

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="logged-in-div">
          <ProfileFormModal user={sessionUser}/>
          <div id="logout-button" className="delve-button" onClick={()=>{dispatch(logout())}}>LOG OUT</div>
        </div>
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
