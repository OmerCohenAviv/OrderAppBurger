import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = {
    meat: 1,
    bacon: 1,
    salad: 0.5,
    cheese: 0.5
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            meat: 0,
            bacon: 0,
            cheese: 0,
            salad: 0
        },
        totalPrice: 4,
        purchasing: false
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
        alert('Continu....e')
    }
    render() {
        const disableButton = {
            ...this.state.ingredients
        }
        for (let key in disableButton) {
            disableButton[key] = disableButton[key] <= 0
        }

        let modalSummary = null
        if (this.state.purchasing) {
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
        return (
            <Fragment>
                {modalSummary}
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    clickedPurchase={this.purchaseHandler}
                    disableButton={disableButton}
                    totalPrice={this.state.totalPrice}
                    ingredientAdd={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientHandler} />
            </Fragment>

        );
    };
};

export default BurgerBuilder;