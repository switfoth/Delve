import React from "react";
import AppWrapper from '../AppWrapper/index';
import './base-page.css';

const BasePage = ()=>{

return (
    <>
        <head>
            <meta charset="utf-8" />
            <title>Delve</title>
            <meta property="og:image" content="https://i.imgur.com/SfMlija.png" />
            <meta property="og:description" content="Delve is a loot tracker for Dungeons and Dragons and other D20 based systems that lets you keep track of parties, party members, and the loot associated with them!" />
            <meta property="og:url"content="http://delve-tracker.herokuapp.com" />
            <meta property="og:title" content="Delve - Dungeons and Dragons Loot Tracker" />
        </head>
            <AppWrapper id="root" style={{height: '100%'}}/>
    </>
)
}

export default BasePage
