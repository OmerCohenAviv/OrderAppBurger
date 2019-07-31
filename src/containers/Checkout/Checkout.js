import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: null
    };


    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let totalPrice = ''
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                totalPrice = param[1]
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: totalPrice })
    }

    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    cancelOrderHandler = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    clickedContinue={this.continueOrderHandler}
                    clickedCancel={this.cancelOrderHandler}
                    ingredients={this.state.ingredients} />
                <Route path={this.props.match.path + "/contact-data"}
                    render={(props) => <ContactData 
                        {...props}
                        totalPrice={this.state.totalPrice}
                        ingredients={this.state.ingredients} />}
                />
            </div>
        );
    }
}


export default Checkout;