import * as actionTypes from './actionTypes';
import axios from 'axios'



export const authRedirected = () => {
    return {
        type: actionTypes.AUTH_REDIRECTED
    }
}
const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};


const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};
export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expireDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expireTime * 1000)
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC4Mt38VPwTpOFbvh_hyNIzL6iJWrkSwak'
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC4Mt38VPwTpOFbvh_hyNIzL6iJWrkSwak'
        }
        axios.post(url, authData)
            .then(response => {
                let date = new Date()
                let expireDate = date.getHours() * 600 + date.getMinutes() * 60 + date.getSeconds() + response.data.expiresIn
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expireDate', expireDate)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        if (!token) {
            console.log('logout')
            return dispatch(authLogout());
        }
        else {
            const expireDate = localStorage.getItem('expireDate')
            let dateCheck = new Date();
            dateCheck = dateCheck.getHours() * 600 + dateCheck.getMinutes() * 60 + dateCheck.getSeconds()
            if (expireDate < dateCheck ) {
                console.log('logout')
                return dispatch(authLogout());
            }
            dispatch( authSuccess(token, userId) )
        }
    };
};