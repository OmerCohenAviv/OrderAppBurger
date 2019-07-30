import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import classes from './OrderSummary.module.css';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}>
                {igKey}: {this.props.ingredients[igKey]}
            </li>
        });
        const danger = 'Danger'
        const success = 'Success'
        return (
            < div className={classes.OrderSummary} >
                <strong>Order Summary!</strong>
                <ul><span>{ingredientSummary}</span></ul>
                <strong>Total Price - {this.props.totalPrice} $</strong>
                <p>
                    <Button btnType={success} clicked={this.props.continue}>Continue To Checkout!</Button>
                    <Button btnType={danger} clicked={this.props.cancel}>Cancel :(</Button>
                </p>
            </div>

        )
    }
}



export default OrderSummary;