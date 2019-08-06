import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// import * as actions from '../../store/actions/index'

class Layout extends Component {
    state = {
        showSideDrawer: false,
        clickedLink: false
    }
    
    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false, clickedLink: true })
    }

    sideDrawerOpenHander = () => {
        this.setState({ showSideDrawer: true, clickedLink: false })
    }

    clickedLinkHandler = () => {
        this.setState ({clickedLink: true, showSideDrawer: false})
    }
    render() {
        return (
            <Fragment>
                <Toolbar 
                redirected={this.props.redirected}
                auth={this.props.auth !== null}
                openDrawer={this.sideDrawerOpenHander}/>
                <SideDrawer
                    isAuthenticated={this.props.auth}
                    clickedLinkState={this.state.clickedLink}
                    clickedLink={this.clickedLinkHandler}
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Layout}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    };

}

const mapStateToProps = state => {
    return {
        auth: state.authReducer.token,
        redirected: state.authReducer.redirected 
    }
}

const mapDisptachToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps,mapDisptachToProps)(Layout);