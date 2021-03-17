import React from "react";
import AppWrapper from '../AppWrapper/index';
import { Helmet } from 'react-helmet';
import './base-page.css';

const BasePage = ()=>{

    return (
        <html lang="en" prefix="og: http://ogp.me/ns#">
            <Helmet>
                <meta charset="utf-8" />
                <meta property="og:title" content="Delve App" />
                <meta name="image" property="og:image" content="https://i.imgur.com/SfMlija.png" />
                <meta name="author" content="Seth Witfoth" />
                <meta property="og:description" content="Delve: Loot Tracking for Dungeons and Dragons"/>
                <meta property="og:url" content="https://delve-tracker.herokuapp.com/" />
            </Helmet>
                <AppWrapper id="root" style={{height: '100%'}}/>
        </html>
    )
}

export default BasePage
