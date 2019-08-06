import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >BurgerBuilder</NavigationItem>
        {
            props.auth ? <NavigationItem link="/orders" >Orders</NavigationItem> :
                null
        }
        {
            props.auth
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/login" >Authenticate</NavigationItem>
        }
    </ul>
)

export default navigationItems;