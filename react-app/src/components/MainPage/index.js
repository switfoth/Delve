import React from "react";
import "./mainpage.css";
import Member from '../Member_Page/index'
import Party from '../Party_Page/index'

const MainPage = ()=>{


    return (
        <>
            <div id='main-page'>
                <h1>Main Page</h1>
                <Party/>
                <Member/>
            </div>
        </>
    )
}

export default MainPage
