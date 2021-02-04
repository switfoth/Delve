import React from "react";
import "./appwrapper.css";
import { useSelector } from 'react-redux';
import MainPage from '../MainPage/index';
import NavBar from '../NavBar/NavBar';
import Header from '../Header/index';
import Welcome from '../Welcome/index';


const AppWrapper = ()=>{
    let sessionUser = useSelector(state => state.session.user);
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <MainPage/>
        );
    } else {
        sessionLinks = (
            <Welcome/>
        );
     }

    return (
        <>
           <div id="app-wrapper">
               <Header/>
               <NavBar/>
               {sessionLinks}
           </div>
        </>
    )
}

export default AppWrapper
