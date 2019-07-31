import React, { Component, Fragment } from 'react';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICE = {
    meat: 1,
    bacon: 1,
    salad: 0.5,
    cheese: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get("ingredients.json")
            .then(response => {
                this.setState({ ingredients: response.data })
            })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAdd = INGREDIENTS_PRICE[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    }
    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] !== 0) {
            const oldCount = this.state.ingredients[type]
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }
            updatedIngredients[type] = updatedCount;
            const priceLess = INGREDIENTS_PRICE[type]
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceLess
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        }
    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }
    modalClosedHandler = () => {
        this.setState({ purchasing: false })
    }

    continueOrderHandler = () => {
        let ingredientsParams = [];
        for (let i in this.state.ingredients) {
            ingredientsParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        }
        ingredientsParams.push('price=' + this.state.totalPrice)
        const ingredientsString = ingredientsParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + ingredientsString
        });
    };
    render() {
        const disableButton = {
            ...this.state.ingredients
        }
        for (let key in disableButton) {
            disableButton[key] = disableButton[key] <= 0
        }

        let modalSummary = null
        if (!this.state.loading && this.state.ingredients) {
            modalSummary = <Modal
                modalClosed={this.modalClosedHandler}
                show={this.state.purchasing}>
                <OrderSummary
                    continue={this.continueOrderHandler}
                    cancel={this.modalClosedHandler}
                    totalPrice={this.state.totalPrice}
                    ingredients={this.state.ingredients} />
            </Modal>
        }
        if (this.state.loading && !this.state.ingredients) {
            modalSummary = <Modal
                modalClosed={this.modalClosedHandler}
                show={this.state.purchasing}>
                <Spinner />
            </Modal>
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded..</p> : <Spinner />
        if (this.state.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    clickedPurchase={this.purchaseHandler}
                    disableButton={disableButton}
                    totalPrice={this.state.totalPrice}
                    ingredientAdd={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler} />
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

export default withErrorHandler(BurgerBuilder, axios);