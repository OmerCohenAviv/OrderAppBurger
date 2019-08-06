import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose  } from "redux";
import { Provider} from "react-redux";


import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import BurgerBuilderReducer from './store/reducers/burgerBuilderReducer';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/auth';

//Combing Reducers.
const combinedRed = combineReducers({
    burgerBuilderReducer: BurgerBuilderReducer,
    orderReducer: orderReducer,
    authReducer: authReducer
});
//Adding devtools
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  : null || compose

//Creating store
const store = createStore(combinedRed, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={ store }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
