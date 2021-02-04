import React from "react";
import "./appwrapper.css";
import MainPage from '../MainPage/index'
import NavBar from '../NavBar/NavBar'


const AppWrapper = ()=>{


    return (
        <>
           <div id="app-wrapper">
               <NavBar/>
               <MainPage/>
           </div>
        </>
    )
}

export default AppWrapper
