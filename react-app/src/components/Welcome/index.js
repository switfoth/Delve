import React from "react";
import "./welcome.css";
import SignupFormModal from '../Signup_Form_Modal/index.js';
import LoginFormModal from '../Login_Form_Modal/index.js';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

const Welcome = ()=>{
    const dispatch = useDispatch();
    let username = "Demo";
    let password = "password";

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sessionActions.login({ username, password }))
      };

    return (
        <>
            <div id="welcome-page">
                <div id="left-column">
                    <img id="lewt-welcome" src="https://i.imgur.com/7xzMLzi.png" alt="Lewt the Kobold Adventurer"></img>
                </div>
                <div id="right-column">
                    <div id="welcome-message">
                        <h1>Welcome to Delve!</h1>
                            <h3>Delve is a dungeon acquisition corporation</h3>
                            <h3>run by a helpful clan of Kobolds.</h3>
                            <br></br>
                            <h3>They'll help keep track of your different</h3>
                            <h3>TTRPG parties,the members within them,</h3>
                            <h3>and most importantly, the loot!</h3>
                            <br></br>
                            <h3>Organize which party member has which items</h3>
                            <h3>and how much each item is worth in order to</h3>
                            <h3>reduce some of your headache!</h3>
                    </div>
                    <br></br>
                    <div id="temp-form">
                        <SignupFormModal/>
                    </div>
                    <br></br>
                    <div id="welcome-screen-mobile-login">
                        <LoginFormModal/>
                    </div>
                    <br></br>
                    <div id="demo-button">
                        <button className="delve-button" onClick={handleSubmit}>Demo Login</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome
