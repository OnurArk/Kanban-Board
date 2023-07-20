import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './footer.module.css';

const svgFooter =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Weather_icon_-_full_moon.svg/1200px-Weather_icon_-_full_moon.svg.png';

const Footer = () => {
  const locationData = useLocation();
  const isInAuth = locationData.pathname === '/authentication';
  console.log(locationData.search);

  const searchParams = new URLSearchParams(locationData.search);

  const isSignup = searchParams.get('mode') === 'signup';

  const style = {
    backgroundColor: isInAuth ? (isSignup ? 'black' : '#5B6AB7') : null,
    color: isInAuth ? 'white' : null,
  };

  return (
    <div className={styles['footer-container']} style={style}>
      <p className={styles.footerText}>
        &#169; This Website Made By Onur ARIK using React.js
      </p>
      <img src={svgFooter} alt='moon' className={styles.moon} />
    </div>
  );
};

export default Footer;
