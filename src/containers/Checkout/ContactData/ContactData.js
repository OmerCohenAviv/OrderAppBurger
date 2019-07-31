import React, { Component } from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        loading: false,
        name: '',
        email: '',
        adress: {
            street: '',
            postalCode: ''
        }
    };


    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Omer',
                adress: {
                    street: 'Poleg',
                    zipCode: 'Random'
                }
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            }
            )
            .catch(error => this.setState({ loading: false }));
    }
    render() {
        let form = <Spinner />
        if (!this.state.loading) {
            form = (
                <form>
                    <input type="text" placeholder="name" />
                    <input type="text" placeholder="email" />
                    <input type="text" placeholder="adress" />
                    <input type="text" placeholder="street" />
                    <input type="text" placeholder="postalCode" />
                    <Button
                        clicked={this.orderHandler}
                        btnType='Success'
                    >Order!
                </Button>
                </form>
            )
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    };
}


export default ContactData;