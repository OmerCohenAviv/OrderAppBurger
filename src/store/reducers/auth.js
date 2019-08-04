import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility/updateObject';

const initialState = {
    token: null,
    userId: null,
    loading: false,
    redirected: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //Starting Authentication Process (Sign in/ Sign up)
        case (actionTypes.AUTH_START):
            return updateObject(state, { loading: true, error: null });

        //Authentication Process Success.. 
        case (actionTypes.AUTH_SUCCESS):
            return updateObject(state, {
                token: action.token,
                userId: action.userId,
                error: false,   
                loading: false
            });
            //Error 
        case (actionTypes.AUTH_FAIL):
            return updateObject(state, {
                error: action.error,
                loading: false
            });

        case (actionTypes.AUTH_LOGOUT): {
            return updateObject(state, {
                token: null,
                userId: null,
                redirected: false
            });
        }
        case (actionTypes.AUTH_REDIRECTED): {
            return updateObject(state, {
                redirected: !state.redirected
            })
        }   
        default: return state
    };
};

export default reducer