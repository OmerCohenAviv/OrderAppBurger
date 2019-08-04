import React from 'react';

import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.openDrawer}/>
         <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems 
            redirected={props.redirected}
            auth={props.auth} 
            />
        </nav>
    </header>
)

export default toolbar;