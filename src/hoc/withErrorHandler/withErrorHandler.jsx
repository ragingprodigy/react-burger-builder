import React, { Component, Fragment } from 'react';
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
      this.reqInterceptor = axios.interceptors.request.use(
        (req) => {
          this.setState({ error: null });
          return req;
        }
      );
      
      this.respInterceptor = axios.interceptors.response.use(res => {
        console.log(res);
        return res;
      }, (error) => this.setState({ error }));
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
        <Fragment>
          <div>
            <Modal modalClosed={this.errorConfirmedHandler.bind(this)} show={this.state.error}>
            {this.state.error ? alert(this.state.error.message) : null}
            </Modal>
          </div>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;