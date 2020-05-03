import React, { Component } from 'react';
import Input from '@burger/components/UI/Input/Input';
import Button from "@burger/components/UI/Button/Button";
import { IAuthUIState, TAuthControlKey } from '@burger/interfaces/auth/authUIState';
import classes from './Auth.module.css';
import { Validations, FormElement } from '@burger/interfaces/forms/forms';

class Auth extends Component<any, IAuthUIState> {
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
          isRequired: true,
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
          isRequired: true,
          minLength: 6,
        },
        touched: false,
      },
    },
  };

  checkValidity(value: string, rules: FormElement["validation"]) {
    let isValid = true;

    if (rules![Validations.isRequired]) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules![Validations.minLength]) {
      isValid = value.trim().length >= rules![Validations.minLength] && isValid;
    }

    if (rules![Validations.maxLength]) {
      isValid = value.trim().length <= rules![Validations.maxLength] && isValid;
    }

    if (rules![Validations.isNumeric]) {
      const pattern = /^\d+$/;
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
        isValid: this.checkValidity(event.target.value.trim(), this.state.controls[controlName].validation)
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
  };

  render() {
    const formConfig = this.state.controls;
    const formEls = Object.keys(formConfig).map((key) => {
      const id = key as TAuthControlKey;
      return { id, config: formConfig[id] };
    });

    const form = formEls.map((formElement) => (
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

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button
            // disabled={!this.state.formIsValid}
            buttonType="Success"
            clicked={this.loginHandler}
          >
            LOGIN
          </Button>
        </form>
      </div>
    );
  }
}

export default Auth;