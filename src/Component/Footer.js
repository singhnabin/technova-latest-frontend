import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
function Footer() {
    return (<div className="footer">
        <h1>Tech Nova</h1>
        <p>{"Copyright © "}{new Date().getFullYear} All right reseerved</p>
        <p>Follow Us:</p>
        <div className="footer-icons">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon></TwitterIcon>
        </div>
    </div>)
}
export default Footer;