import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let SideDrawerClass = [classes.SideDrawer, classes.Close];
    if(props.show && !props.clickedLinkState) {
        SideDrawerClass = [classes.SideDrawer, classes.Open];
    }
    else if (props.show && props.clickedLinkState) {
        SideDrawerClass  = [classes.SideDrawer, classes.Close]
    }
    
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.closed}  />
            <div className={SideDrawerClass.join(' ')} >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav onClick={props.clickedLink}>
                    <NavigationItems auth={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    )
}

export default sideDrawer;