import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/updateObject';

const initalState = {
    orders: [],
    error: false,
    purchased: false,
    loading: false
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        //Getting orders from DB 
        case (actionTypes.GET_ORDERS): {
            const updateState = {
                order: action.orders,
                error: false,
                loading: false
            }
            return updateObject(state, updateState)
        }
        // checkin if any error from fethcing orders
        case (actionTypes.CHECK_ERROR_ORDERS): {
            const updateState = {
                error: true,
                loading: false
            }
            return updateObject(state, updateState)
        }
        //Startin to fetch  orders from db...
        case (actionTypes.START_FETCH_ORDER): {
            const updateState = {
                order: action.orders,
                loading: true
            }
            return updateObject(state, updateState)
        }
        //Ordering start...
        case (actionTypes.ORDER_START): {
            const updateState = {
                loading: true
            }
            return updateObject(state, updateState)
        }// Fixes redircting again after purchasing.
        case (actionTypes.PURCHASE_INIT): {
            const updateState = {
                purchased: false
            }
            return updateObject(state, updateState)
        }//Ordering success...
        case (actionTypes.ORDER_SUCCESS): {
            const newOrder = updateObject(action.orderData, { id: action.orderId })
            const updatedState = {
                orders: state.orders.concat(newOrder),
                loading: false,
                purchased: true
            }
            return updateObject(state, updatedState)
        }//Ordering Fail....
        case (actionTypes.ORDER_FAIL):
            return updateObject(state, { loading: false })
        default:
            return state
    };
};


export default reducer