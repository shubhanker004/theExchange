import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import ContactsIcon from '@mui/icons-material/Contacts';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
//import { useSelector } from 'react-redux';

import './footer.css'


const Footer = () => {
    

  return(
    <footer className="footer-distributed">
      <div className="footer-left">
        <a href="/"><h1>The Exchange</h1></a>

        <p className="footer-links">
          <a href="/">Home</a>
          |
          <a href="/about"> About </a>
          |
          <a href="/privacy"> Privacy Policy </a>
          | 
          <a href="/refund"> Refund Policy </a>
        </p>

        <p className="footer-company-name">&copy; 2021 The Exchange Vape Wholesale Company.</p>
      </div>

      <div className="footer-center">
        <div>
          <ContactsIcon color="primary"/>
            <p><span>  427 E Magnolia Ave, Apt 18</span>
            Auburn, Alabama, 36830</p>
        </div>
        <p></p>

        <div>
          <BusinessIcon color="primary"/>
            <p>  8:00 a.m - 5:00 p.m</p>
        </div>
        <p></p>

        <div>
          <PhoneIcon color="primary"/>
          <p>  +1 334 492 1018</p>
        </div>
        <p></p>

        <div>
          <EmailIcon color="primary"/>
          <p>  support@theexchange.com</p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          We offer great quality vape and delta products.</p>
        <div className="footer-icons">
          <a href="http://fb.com"><FacebookIcon /></a>
          <a href="http://twitter.com"><TwitterIcon /></a>
          <a href="http://instagram.com"><InstagramIcon /></a>
        </div>
      </div>
      </footer>
  )

}

export default Footer;