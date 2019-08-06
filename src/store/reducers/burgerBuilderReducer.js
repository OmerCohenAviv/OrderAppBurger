
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/updateObject'

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}
const INGREDIENTS_PRICE = {
    meat: 1,
    bacon: 1,
    salad: 0.5,
    cheese: 0.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Adding Ingredient  
        case (actionTypes.ADD_INGREDIENT):
            const updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updateIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
            return updateObject(state, updatedState)

        ////Removing Ingredient 
        case (actionTypes.REMOVE_INGREDIENT): {
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            }
            return updateObject(state, updatedState)
        }
        //Setting Ingredients(From DB)
        case (actionTypes.SET_INGREDIENTS): {
            const updatedIngredients = updateObject(state.ingredients, action.ingredients)
            const updatedState = { ingredients: updatedIngredients, error: false }
            return updateObject(state, updatedState)
        }
        //if catched error true >
        case (actionTypes.CHECK_ERROR_INGREDIENTS): {
            return updateObject(state, { error: true })
        }
        //Reseting ingredients/price 
        case (actionTypes.RESET_BURGER): {
            return updateObject(state, { totalPrice: 4, ingredients: null })
        }
        default:
            return state
    }
}



export default reducer