import React, { useState } from "react";
import "./welcome.css";
import SignUpForm from '../auth/SignUpForm';

const Welcome = ()=>{
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <>
            <div id="welcome-page">
                <div id="left-column"></div>
                    <img src="https://i.imgur.com/YL8CXDF.png" alt="Lewt the Kobold Adventurer"></img>
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
                        <SignUpForm props={authenticated, setAuthenticated}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Welcome
