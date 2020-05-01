import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '@burger/components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      
      this.respInterceptor = axios.interceptors.response.use(
        res => res,
        (error) => this.setState({ error })
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.respInterceptor);
    }

    errorConfirmedHandler() {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal
            modalClosed={this.errorConfirmedHandler.bind(this)}
            show={this.state.error}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;