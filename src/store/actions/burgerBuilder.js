import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


//Action (Adding Ingredient)
export const addIngredientAction = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName
    };
};

//Action (Removing Ingredient)
export const removeIngredientAction = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName
    };
};


const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

const checkError = () => {
    return {
        type: actionTypes.CHECK_ERROR_INGREDIENTS,
    }
}

//Action (Fetching Ingredients DB) 
export const getIngredientsAction = () => {
    return dispatch => {
        axios.get("ingredients.json")
            .then(response => {
                dispatch(setIngredients(response.data))
            })
            .catch(error => {
                dispatch(checkError())
            })
    }
}


export const resetBurger = () => {
    return {
        type: actionTypes.RESET_BURGER
    }
}


