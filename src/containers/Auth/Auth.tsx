import React, { Component } from "react";
import Input from "@burger/components/UI/Input/Input";
import Button from "@burger/components/UI/Button/Button";
import { Redirect } from 'react-router-dom';
import {
  IAuthUIState,
  TAuthControlKey,
} from "@burger/interfaces/auth/authUIState";
import classes from "./Auth.module.css";
import { Validations, FormElement } from "@burger/interfaces/forms/forms";
import { connect } from "react-redux";
import { auth } from "@burger/store/actions";
import { IAuthUIProps } from "@burger/interfaces/auth/authUIProps";
import { TAppState } from "@burger/interfaces/appState";
import Spinner from "@burger/components/UI/Spinner/Spinner";

class Auth extends Component<IAuthUIProps, IAuthUIState> {
  state: IAuthUIState = {
    formIsValid: false,
    controls: {
      email: {
        value: "",
        isValid: false,
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email Address",
        },
        validation: {
          [Validations.isRequired]: true,
          [Validations.isEmail]: true,
        },
        touched: false,
      },
      password: {
        value: "",
        isValid: false,
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        validation: {
          [Validations.isRequired]: true,
          [Validations.minLength]: 6,
        },
        touched: false,
      },
    },
    isSignUp: true,
  };

  checkValidity(value: string, rules: FormElement["validation"]) {
    let isValid = true;

    if (!rules) {
      return isValid;
    }

    if (rules[Validations.isRequired]) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules[Validations.minLength]) {
      isValid = value.trim().length >= rules![Validations.minLength] && isValid;
    }

    if (rules[Validations.maxLength]) {
      isValid = value.trim().length <= rules[Validations.maxLength] && isValid;
    }

    if (rules[Validations.isNumeric]) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value.trim()) && isValid;
    }

    if (rules[Validations.isEmail]) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value.trim()) && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event: any, controlName: TAuthControlKey) => {
    const updatedForm: any = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value.trim(),
        touched: true,
        isValid: this.checkValidity(
          event.target.value.trim(),
          this.state.controls[controlName].validation
        ),
      },
    };

    const updatedFormElement = { ...updatedForm[controlName] };
    updatedFormElement.value = event.target.value.trim();
    updatedFormElement.touched = true;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedForm[controlName] = updatedFormElement;

    // let formIsValid = true;
    // for (const identifier in updatedForm) {
    //   formIsValid = updatedForm[identifier].isValid && formIsValid;
    // }

    this.setState({ controls: updatedForm });
  };

  loginHandler = (event: any) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState((state) => ({ isSignUp: !state.isSignUp }));
  };

  render() {
    const formConfig = this.state.controls;
    const formEls = Object.keys(formConfig).map((key) => {
      const id = key as TAuthControlKey;
      return { id, config: formConfig[id] };
    });

    let form = formEls.map((formElement) => (
      <Input
        invalid={!formElement.config.isValid}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
      />
    ));

    if (this.props.loading) {
      form = [<Spinner key="spinner" />];
    }

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p className={classes.Error}>{this.props.error.message}</p>;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to='orders' />;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form>
          {form}
          <Button
            // disabled={!this.state.formIsValid}
            buttonType="Success"
            clicked={this.loginHandler}
          >
            {this.state.isSignUp ? "SIGN UP" : "SIGN IN"}
          </Button>
        </form>
        <Button buttonType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: TAppState) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch: any) => ({
  onAuth: (email: string, password: string, isSignUp: boolean) =>
    dispatch(auth(email, password, isSignUp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
