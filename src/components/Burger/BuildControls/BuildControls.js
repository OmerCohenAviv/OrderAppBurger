import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes  from './BuildControls.module.css'

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <h1>Total Price - {props.totalPrice}</h1>
        {controls.map(ctrl => (
            <BuildControl
            disableButton={props.disableButton[ctrl.type]}
            key={ctrl.label} 
            ingredientRemove={() => props.ingredientRemove(ctrl.type)}
            ingredientAdd={() => props.ingredientAdd(ctrl.type)}
            label={ctrl.label}/>
        ))}
        <button
        onClick={props.clickedPurchase}
        disabled={props.totalPrice ===  4}
        className={classes.OrderButton}>Order!</button>
        
    </div>  
);


export default buildControls;