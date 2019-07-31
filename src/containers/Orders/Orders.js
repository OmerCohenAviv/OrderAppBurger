import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                const fetchOrders = [];
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({ loading: false, orders: fetchOrders })
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order =>(
                    <Order
                        totalPrice={order.price}
                        ingredients={order.ingredients}
                        key={order.id} />
                ))}
            </div >
        );
    };
};


export default withErrorHandler(Orders, axios);