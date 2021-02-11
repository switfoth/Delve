import React, { useEffect } from "react";
import "./appwrapper.css";
import { useSelector, useDispatch } from 'react-redux';
import { getItemTypes } from '../../store/itemtype'
import MainPage from '../MainPage/index';
import NavBar from '../NavBar/NavBar';
import Header from '../Header/index';
import Footer from '../Footer/index';
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

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getItemTypes());
    }, [dispatch])

    return (
        <>
           <div id="app-wrapper">
               <Header/>
               <NavBar/>
               {sessionLinks}
               <Footer/>
           </div>
        </>
    )
}

export default AppWrapper
