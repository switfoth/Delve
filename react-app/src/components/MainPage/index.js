import React from "react";
import "./mainpage.css";
import Member from '../Member_Page/index';
import Party from '../Party_Page/index';
import SideBar from "../SideBar";

const MainPage = ()=>{
    return (
            <>
              <div id='main-page'>
                <div id='side-container'>
                    <SideBar id="main-sidebar"/>
                </div>
                <div id='main-container'>
                </div>
              </div>
            </>
    )
}

export default MainPage
