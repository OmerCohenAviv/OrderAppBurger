import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
   return  class  extends Component {
    state = {
        error: false,
    }

    componentWillMount () {
        this.reqInstance =   axios.interceptors.request.use(req => {
            this.setState({error: null})
            return req;
        })
        this.responseInstance = axios.interceptors.response.use(res => res, error => {
            this.setState({error: error,})
        })
    }  
    componentWillUnmount () {
        console.log('WillUnmount')
        axios.interceptors.request.eject(this.reqInstance);
        axios.interceptors.response.eject(this.responseInstance);
    }
    closeModalHandler = () => {
        this.setState({error: null});
    }

    
        render() {
            return (
                <Fragment>
                    <Modal 
                    show={this.state.error} 
                    modalClosed={this.closeModalHandler}> {this.state.error ? this.state.error.message : null } </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        };
    }
}
export default withErrorHandler;