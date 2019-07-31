import React from 'react';

import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import  classes  from './CheckoutSummary.module.css';


const checkout = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>CheckOut</h1>
        <div style={{ width: '300px', margin: 'auto' }}>
            <Burger ingredients={props.ingredients} />
        </div>
        <ul>
            <li></li>
        </ul>
        <div>
            <Button clicked={props.clickedContinue} btnType='Success'>Continue</Button>
            <Button clicked={props.clickedCancel} btnType='Danger'>Cancel</Button>
        </div>
    </div>
);


export default checkout