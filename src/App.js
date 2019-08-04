import React, { Component } from 'react';

import './App.css';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//containers
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
//containers

class App extends Component {
    componentWillMount() {
        this.props.checkAuth()
    }
    render() {
        let routes = (
            <Switch>
                <Route path='/login' component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        )
        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={BurgerBuilder} />
                </Switch>
            )
        }
        return (
            <BrowserRouter>
                <div className="App">
                    <Layout>
                        {routes}
                    </Layout>
                </div>
            </BrowserRouter>

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

export default connect(mapStateToProps, mapDispatchToProps)(App);
