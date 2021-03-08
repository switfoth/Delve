import React from "react";
import './footer.css'

const Footer = ()=>{

    return (
        <>
            <div id='footer'>
                <a href="https://www.linkedin.com/in/seth-witfoth/"><img  id="linkedin" src="https://i.imgur.com/l3JTSxi.png" alt="linkedin icon"></img></a>
                <a href="https://twitter.com/MistakeNPotates"><img  id="twitter" src="https://i.imgur.com/tPSJaa2.png" alt="twitter icon"></img></a>
                <a href="https://github.com/switfoth"><img id="github" src="https://i.imgur.com/wRQ3Cgn.png" alt="github icon"></img></a>
                <h4>©Seth Witfoth 2021</h4>
                {/* <a id="ko-fi-link" href='https://ko-fi.com/J3J5AEQC' target='_blank'><img id="ko-fi" src='https://cdn.ko-fi.com/cdn/kofi5.png?v=2' alt='Buy Me a Coffee at ko-fi.com' /></a> */}
            </div>
        </>
    )
}

export default Footer
