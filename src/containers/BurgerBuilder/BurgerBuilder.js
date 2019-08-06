import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }
    
    componentDidMount() {
        if(this.props.redirected) {
            this.props.onRedirected()
        }
        this.props.onResetBurger();
        this.props.onIngredientFetch();
        this.props.onPurchaseInit()
    }


    purchaseHandler = () => {
        if (this.props.auth) {
            return this.setState({ purchasing: true })
        }
        else {
            this.props.onRedirected()
            this.props.history.push('/login')
        }
    }
    modalClosedHandler = () => {
        this.setState({ purchasing: false })
    }

    continueOrderHandler = () => {
        if (this.props.auth) {
            this.props.history.push('/checkout')
        }
    };
    render() {
        const disableButton = {
            ...this.props.ings
        }
        for (let key in disableButton) {
            disableButton[key] = disableButton[key] <= 0
        }

        let modalSummary = null
        if (!this.state.loading && this.props.ings) {
            modalSummary = <Modal
                modalClosed={this.modalClosedHandler}
                show={this.state.purchasing}>
                <OrderSummary
                    continue={this.continueOrderHandler}
                    cancel={this.modalClosedHandler}
                    totalPrice={this.props.totalPrice}
                    ingredients={this.props.ings} />
            </Modal>
        }


        let burger = this.props.error ? <p>Ingredients can't be loaded..</p> : <Spinner />
        if (this.props.ings) {
            burger = (<Fragment>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    isAuth={this.props.auth}
                    clickedPurchase={this.purchaseHandler}
                    disableButton={disableButton}
                    totalPrice={this.props.totalPrice}
                    ingredientAdd={this.props.onIngredientAdded}
                    ingredientRemove={this.props.onIngredientRemove} />
            </Fragment>);
        }
        return (
            <Fragment>
                {modalSummary}
                {burger}
            </Fragment>

        );
    };
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        auth: state.authReducer.token !== null,
        redirected: state.authReducer.redirected
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirected: () => dispatch(burgerBuilderActions.authRedirected()),
        onResetBurger: () => dispatch(burgerBuilderActions.resetBurger()),
        onIngredientAdded: (ingredientName) => dispatch(burgerBuilderActions.addIngredientAction(ingredientName)),
        onIngredientRemove: (ingredientName) => dispatch(burgerBuilderActions.removeIngredientAction(ingredientName)),
        onIngredientFetch: () => dispatch(burgerBuilderActions.getIngredientsAction()),
        onPurchaseInit: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));