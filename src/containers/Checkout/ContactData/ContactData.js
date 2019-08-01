import React, { Component } from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        loading: false,
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'User Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                value: '',
                valid: true
            }
        },
        overAllFormValid: false,
    };

    changeValueHandler = (event, formElementType) => {
        const updateOrderForm = {
            ...this.state.orderForm
        }
        const orderFormElementUpdate = {
            ...updateOrderForm[formElementType]
        }
        orderFormElementUpdate.value = event.target.value
        orderFormElementUpdate.touched = true;
        orderFormElementUpdate.valid = this.checkValid(orderFormElementUpdate.value, orderFormElementUpdate.validation)
        updateOrderForm[formElementType] = orderFormElementUpdate;
        let formIsValid = true;
        for (let elementValid in updateOrderForm) {
            formIsValid = updateOrderForm[elementValid].valid && formIsValid
        }
        this.setState({ orderForm: updateOrderForm, overAllFormValid: formIsValid })

    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let formElementIndentifier in this.state.orderForm) {
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
        }
        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            PersonData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            }
            )
            .catch(error => this.setState({ loading: false }));
    }

    checkValid(value, rules) {
        //required - not an empty input
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length <= rules.minLength && isValid;
        }
        return isValid;
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = <Spinner />
        form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElementsArray.map(formElement => (
                        <Input
                            touched={formElement.config.touched}
                            shouldValid={formElement.config.validation}
                            invalid={!formElement.config.valid}
                            changed={(event) => this.changeValueHandler(event, formElement.id)}
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value} />
                    ))
                }
                <Button
                    disabled={!this.state.overAllFormValid}
                    clicked={this.orderHandler}
                    btnType='Success'
                >Order!
                </Button>
            </form>
        )
        return (
            <div className={classes.ContactData} >
                <h4 style={{ fontSize: '1.6em' }}>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }
}



export default ContactData;