import React from 'react';

import classes from './BuildControl.module.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button
        disabled={props.disableButton}
        onClick={props.ingredientRemove}
        className={classes.Less}>Less</button>
        <button 
        onClick={ props.ingredientAdd } 
        className={ classes.More }>More</button>
    </div>
);

export default buildControl;