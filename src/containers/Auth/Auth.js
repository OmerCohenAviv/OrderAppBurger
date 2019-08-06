import React, { Component } from 'react';


import classes from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject } from '../../store/utility/updateObject';
import { checkValid} from '../../sharedFunctions/sharedFunctions';


//Login page should be rendered  -> Authenticate ? Login UI : Login UI + dont have an account? -> Create one!
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Adress'
                },
                validation: {
                    required: true
                },
                value: '',
                touched: false,
                valid: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 7,
                },
                value: '',
                touched: false,
                valid: false
            }
        },
        isSignUp: true
    };


    inputChangeHandler = (event, controlName) => {
        const updateControl = updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValid(event.target.value, this.state.controls[controlName].validation),
            touched: true
        });
        const updateControlsState = updateObject(this.state.controls, {
            [controlName]: updateControl
        })
        this.setState({ controls: updateControlsState })
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }
    switchSignMethodHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    render() {
        let formArray = [];
        for (let key in this.state.controls) {
            formArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };
        let form = formArray.map(formElement => (
            <Input
                touched={formElement.config.touched}
                shouldValid={formElement.config.validation}
                invalid={!formElement.config.valid}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
            />
        ));
        if (this.props.loading) {
            form = <Spinner />
        }
        let errorMessage = null
        if (this.props.error) {
            errorMessage = (
                <p stlye={{ color: 'red' }}>{this.props.error.message}</p>
            )
        }
        let redirect = null;
        if (this.props.isAuthenticated && !this.props.redirected) {
           return redirect = <Redirect to='/' />
        }
         else  if (this.props.isAuthenticated && this.props.redirected) {
            redirect = <Redirect to='/checkout' />
        }
        return (
            <div className={classes.Auth}>
                {errorMessage}
                {redirect}
                <form onSubmit={this.formSubmitHandler}>
                    {form }
                    <Button
                        btnType='Success'>
                        Submit
                    </Button>
                </form>
                <Button
                    clicked={this.switchSignMethodHandler}
                    btnType='Danger'>
                    {this.state.isSignUp ? 'Switch to Sign In' : 'Switch to Sign up'}
                </Button>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        redirected: state.authReducer.redirected,
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (emailValue, passwordValue, isSignUp) => dispatch(actions.auth(emailValue, passwordValue, isSignUp))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);  