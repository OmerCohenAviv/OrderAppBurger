import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css';

const logo = (props) => (
        <img className={classes.Logo} src={burgerLogo} alt='MyBurger' />
);


export default logo;