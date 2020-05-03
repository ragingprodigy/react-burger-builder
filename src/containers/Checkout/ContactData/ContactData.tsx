import axios from "@burger/axios-orders";
import Button from "@burger/components/UI/Button/Button";
import Input from "@burger/components/UI/Input/Input";
import Spinner from "@burger/components/UI/Spinner/Spinner";
import withErrorHandler from "@burger/hoc/withErrorHandler/withErrorHandler";
import { TAppState } from "@burger/interfaces/appState";
import { FormElement, Validations } from "@burger/interfaces/forms/forms";
import { purchaseBurger } from "@burger/store/actions";
import { ContactDataProps } from "@burger/types/props/contact-data";
import {
  ContactDataState,
  ElementNames,
} from "@burger/types/states/ui/contact-data";
import React, { Component } from "react";
import { connect } from "react-redux";
import s from "./ContactData.module.css";

export class ContactData extends Component<ContactDataProps, ContactDataState> {
  state: ContactDataState = {
    formIsValid: false,
    orderForm: {
      name: {
        value: "",
        isValid: false,
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        validation: {
          isRequired: true,
        },
        touched: false,
      },
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
      street: {
        value: "",
        isValid: false,
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        validation: {
          isRequired: true,
        },
        touched: false,
      },
      postCode: {
        value: "",
        isValid: false,
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code",
        },
        validation: {
          [Validations.isRequired]: true,
          [Validations.minLength]: 4,
          [Validations.maxLength]: 6,
          [Validations.isNumeric]: true,
        },
        touched: false,
      },
      country: {
        value: "",
        isValid: false,
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        validation: {
          isRequired: true,
        },
        touched: false,
      },
      deliveryMethod: {
        value: "standard",
        isValid: true,
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Same Day" },
            { value: "nextday", displayValue: "Next Day" },
            { value: "standard", displayValue: "Standard Delivery" },
          ],
        },
        validation: {
          isRequired: true,
        },
        touched: false,
      },
    },
  };

  orderHandler = (event:any) => {
    event.preventDefault();

    const orderData: { [ElementNames: string]: any } = {};
    const orderForm: { [ElementNames: string]: any } = {
      ...this.state.orderForm,
    };

    for (let formElementIdentifier in orderForm) {
      orderData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const ingredients: any = {};
    this.props.ingredients
      .filter((i) => i.units > 0)
      .forEach(({ label, units }) => {
        ingredients[label] = { label, units };
      });

    const order = { ingredients, orderData };
    this.props.onOrderBurger(order, this.props.token);
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
      isValid = value.trim().length >= rules[Validations.minLength] && isValid;
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

  inputChangedHandler = (event: any, inputIdentifier: ElementNames) => {
    const updatedOrderForm: { [ElementNames: string]: any } = {
      ...this.state.orderForm,
    };

    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value.trim();
    updatedFormElement.touched = true;
    updatedFormElement.isValid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const identifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[identifier].isValid && formIsValid;
    }

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const formConfig = this.state.orderForm!;
    const formEls = Object.keys(formConfig).map((key) => {
      return { id: key as ElementNames, config: formConfig[key] };
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {formEls.map((formElement) => (
          <Input
            invalid={!formElement.config.isValid}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <Button
          disabled={!this.state.formIsValid}
          buttonType="Success"
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={s.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({ burderBuilder, order, auth }: TAppState) => ({
  ingredients: burderBuilder.ingredients,
  loading: order.loading,
  token: auth.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  onOrderBurger: (orderData: any, token: string) => dispatch(purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
