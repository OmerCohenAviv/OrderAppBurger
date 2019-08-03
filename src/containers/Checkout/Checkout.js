import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {




    continueOrderHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    cancelOrderHandler = () => {
        this.props.history.goBack();
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary
                        clickedContinue={this.continueOrderHandler}
                        clickedCancel={this.cancelOrderHandler}
                        ingredients={this.props.ings} />
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
                </div>
            )
        }       

        return summary

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice
    };
};


export default connect(mapStateToProps)(Checkout);