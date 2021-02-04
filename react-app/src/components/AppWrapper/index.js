import React from "react";
import "./appwrapper.css";
import MainPage from '../MainPage/index'
import NavBar from '../NavBar/NavBar'
import Header from '../Header/index'


const AppWrapper = ()=>{


    return (
        <>
           <div id="app-wrapper">
               <Header/>
               <NavBar/>
               <MainPage/>
           </div>
        </>
    )
}

export default AppWrapper
