import React, { Component } from 'react';

import './App.css';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
//containers
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
//containers
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')
})
const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})



class App extends Component {
    componentWillMount() {
        this.props.checkAuth()
    }
    render() {
        let routes = (
            <Switch>
                <Route path='/' exact component={BurgerBuilder} />
                <Route path='/login' component={asyncAuth} />
                <Route path='/checkout' component={asyncCheckout} />
                <Redirect to='/' />
            </Switch>
        )
        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout} />
                    <Route path='/login' component={asyncAuth} />
                    <Route path='/orders' component={asyncOrders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            );
        }
        return (
            <div className="App">
                <Layout>
                    {routes}
                </Layout>
            </div>

        );
    };
};
const mapStateToProps = state => {
    return {
        isAuth: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuth: () => dispatch(actions.checkAuth())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
