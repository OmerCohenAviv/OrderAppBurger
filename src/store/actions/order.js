import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'


const startFetchOrder = () => {
    return {
        type: actionTypes.START_FETCH_ORDER
    }
}


//Getting the orders(setOrder)
const getOrders = (orders) => {
    return {
        type: actionTypes.GET_ORDERS,
        orders: [...orders]

    };
};
//Checking error (setOrders)
const checkErrorOrders = () => {
    return {
        type: actionTypes.CHECK_ERROR_ORDERS,
        error: true
    };
};

//Async fetching orders.
export const setOrders = (token) => {
    return dispatch => {
        dispatch(startFetchOrder())
        axios.get('/orders.json?auth=' + token)
            .then(response => {
                console.log(response)
                const fetchedOrders = [];
                for (let key in response.data) {
                    if (response.data[key].userId === localStorage.getItem('userId')) {
                        fetchedOrders.push({
                            ...response.data[key],
                            id: key
                        }) 
                    }
                }
                dispatch(getOrders(fetchedOrders))
            })
            .catch(err => {
                dispatch(checkErrorOrders())
            });
    };
};

const orderStart = () => {
    return {
        type: actionTypes.ORDER_START,
    }
}

const orderSuccess = (id, orderData) => {
    return {
        type: actionTypes.ORDER_SUCCESS,
        orderId: id,
        orderData: orderData,
        loading: false,
        error: false,
    }
}
const orderFail = (error) => {
    return {
        type: actionTypes.ORDER_FAIL,
        error: error,
        loading: false
    }
}

export const purchaseBurgerAction = (orderData, token) => {
    return dispatch => {
        dispatch(orderStart())
        console.log('Token' + token)
        axios.post('/orders.json?auth=' + token, orderData)
            .then(res => {
                dispatch(orderSuccess(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(orderFail(err))
            });
    };
};


export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}
