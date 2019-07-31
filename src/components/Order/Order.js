import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = [];

    for (let ingredientName in props.ingredients) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        )
    }
    const IngredientOutput = ingredients.map(ig => {
        return <span 
        style={{
            fontSize: '1.1em',
            margin: '0 8px',
            border: '1px solid #ccc',
            paddin: '5px',
            display: 'inline-block',
            textTransform:'capitalize' }}
        key={ig.name}>{ig.name} ({ig.amount})</span>;
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients:{IngredientOutput} </p>
            <p>ToalPrice: <value>{props.totalPrice}</value></p>
        </div>
    )
}


export default order;