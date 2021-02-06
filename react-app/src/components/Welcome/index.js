import React, { useState } from "react";
import "./welcome.css";
import SignUpForm from '../auth/SignUpForm';

const Welcome = ()=>{
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <>
            <div id="welcome-page">
                <div id="welcome-message">
                    <h1>Welcome Page</h1>
                </div>
                <div id="temp-form">
                    <SignUpForm props={authenticated, setAuthenticated}/>
                </div>

            </div>
        </>
    )
}

export default Welcome
