import React, { Component } from 'react';
import { logout } from '@burger/store/actions';
import { connect } from 'react-redux';
import { ILogoutProps } from '@burger/interfaces/logout/logoutProps';
import { Redirect } from 'react-router-dom';

class Logout extends Component<ILogoutProps> {
  componentDidMount() {
    this.props.onLogout();
  }
  render() {
    return (
      <Redirect to='/' />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onLogout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(Logout);