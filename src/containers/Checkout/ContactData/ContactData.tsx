import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { TAppState } from "../../../interfaces/appState";
import { IContactDataProps } from '../../../interfaces/contactData/contatcDataProps';
import { Validations } from "../../../interfaces/forms/forms";
import { checkValidity } from '../../../shared/utility';
import { purchaseBurger } from "../../../store/actions";
import { ContactDataState, ElementNames } from "../../../types/states/ui/contact-data";
import React, { Component } from "react";
import { connect } from "react-redux";
import s from "./ContactData.module.css";

export class ContactData extends Component<IContactDataProps, ContactDataState> {
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

    const order = { ingredients, orderData, userId: this.props.userId };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event: any, inputIdentifier: ElementNames) => {
    const orderForm: any = {
      ...this.state.orderForm,
      [inputIdentifier]: {
        ...this.state.orderForm![inputIdentifier],
        value: event.target.value.trim(),
        touched: true,
        isValid: checkValidity(
          event.target.value.trim(),
          this.state.orderForm![inputIdentifier].validation
        ),
      },
    };

    let formIsValid = true;
    for (const identifier in orderForm) {
      formIsValid = orderForm[identifier].isValid && formIsValid;
    }

    this.setState({ orderForm, formIsValid });
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

const mapStateToProps = ({ burgerBuilder: burderBuilder, order, auth }: TAppState) => ({
  ingredients: burderBuilder.ingredients,
  loading: order.loading,
  token: auth.token,
  userId: auth.userId,
});

const mapDispatchToProps = (dispatch: any) => ({
  onOrderBurger: (orderData: any, token: string) => dispatch(purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
