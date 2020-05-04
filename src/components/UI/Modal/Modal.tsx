import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from '../Backdrop/Backdrop';
import { GenericHandler } from "../../../types/callbacks";
import { Children } from "../../../types/overrides";

type ModalProps = { children?: Children; show: boolean; modalClosed: GenericHandler; };

class Modal extends Component<ModalProps> {
  shouldComponentUpdate(nextProps: ModalProps, nextState: any) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
