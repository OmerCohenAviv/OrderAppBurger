import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner';


class Orders extends Component {

    componentDidMount() {
        this.props.onSetOrders(this.props.token)
    }


    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    totalPrice={order.price}
                    ingredients={order.ingredients}
                    key={order.id} />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetOrders: (token) => dispatch(actions.setOrders(token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));