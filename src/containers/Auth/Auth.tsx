import Button from "@burger/components/UI/Button/Button";
import Input from "@burger/components/UI/Input/Input";
import Spinner from "@burger/components/UI/Spinner/Spinner";
import { TAppState } from "@burger/interfaces/appState";
import { IAuthUIProps } from "@burger/interfaces/auth/authUIProps";
import { IAuthUIState, TAuthControlKey } from "@burger/interfaces/auth/authUIState";
import { Validations } from "@burger/interfaces/forms/forms";
import { checkValidity } from '@burger/shared/utility';
import { auth, setAuthRedirectPath } from "@burger/store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import classes from "./Auth.module.css";

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
    isSignUp: false,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event: any, controlName: TAuthControlKey) => {
    const updatedForm: any = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value.trim(),
        touched: true,
        isValid: checkValidity(
          event.target.value.trim(),
          this.state.controls[controlName].validation
        ),
      },
    };

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
      errorMessage = (
        <p className={classes.Error}>{this.props.error.message}</p>
      );
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form>
          {form}
          <Button
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
  buildingBurger: state.burderBuilder.buildingBurger,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch: any) => ({
  onAuth: (email: string, password: string, isSignUp: boolean) =>
    dispatch(auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
