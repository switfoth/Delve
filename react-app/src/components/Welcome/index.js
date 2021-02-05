import React, { useState } from "react";
import "./welcome.css";
import SignUpForm from '../auth/SignUpForm'

const Welcome = ()=>{
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <>
            <div id="welcome-page">
                <h1>Welcome Page</h1>
                <SignUpForm props={authenticated, setAuthenticated}/>
            </div>
        </>
    )
}

export default Welcome
