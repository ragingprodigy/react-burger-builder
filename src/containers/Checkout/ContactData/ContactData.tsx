import axios from "@burger/axios-orders";
import Button from "@burger/components/UI/Button/Button";
import Input from "@burger/components/UI/Input/Input";
import Spinner from "@burger/components/UI/Spinner/Spinner";
import { ContactDataProps } from "@burger/types/props/contact-data";
import {
  ContactDataState,
  ElementNames,
  FormElement,
  Validations,
} from "@burger/types/states/contact-data";
import React, { Component } from "react";
import s from "./ContactData.module.css";

export class ContactData extends Component<ContactDataProps, ContactDataState> {
  state: ContactDataState = {
    loading: false,
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
        value: "",
        isValid: false,
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

  orderHandler = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({ loading: true });
    const orderData: { [ElementNames: string]: any } = {};
    const orderForm: { [ElementNames: string]: any } = {
      ...this.state.orderForm,
    };

    for (let formElementIdentifier in orderForm) {
      orderData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData,
    };

    axios
      .post("/orders.json", order)
      .then((r) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((e) => {
        console.log(e);
        this.setState({ loading: false });
      });
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

    console.log(updatedFormElement);

    this.setState({ orderForm: updatedOrderForm });
  };

  render() {
    const formConfig = this.state.orderForm!;
    const formEls = Object.keys(formConfig).map((key) => {
      return { id: key as ElementNames, config: formConfig[key] };
    });

    let form = (
      <form>
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
        <Button buttonType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;
