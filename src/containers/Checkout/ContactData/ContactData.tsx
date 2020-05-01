import axios from "@burger/axios-orders";
import Button from "@burger/components/UI/Button/Button";
import Input from "@burger/components/UI/Input/Input";
import Spinner from "@burger/components/UI/Spinner/Spinner";
import { ContactDataProps } from "@burger/types/props/contact-data";
import { ContactDataState } from "@burger/types/states/contact-data";
import React, { Component } from "react";
import s from "./ContactData.module.css";

export class ContactData extends Component<ContactDataProps, ContactDataState> {
  state: ContactDataState = {
    name: "",
    email: "",
    address: {
      street: "",
      postCode: "",
    },
    loading: false,
    orderForm: {
      name: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
      },
      email: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email Address",
        },
      },
      street: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
      },
      postCode: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip Code",
        },
      },
      country: {
        value: "",
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
      },
      deliveryMethod: {
        value: "",
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Same Day" },
            { value: "nextday", displayValue: "Next Day" },
            { value: "standard", displayValue: "Standard Delivery" },
          ],
        },
      },
    },
  };

  orderHandler = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({ loading: true });
    const { name, email, address } = this.state;
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: { name, email, address },
      deliveryMethod: "sameday",
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

  render() {
    const formConfig = this.state.orderForm!;
    const formEls = Object.keys(formConfig).map((key) => {
      return { id: key, config: formConfig[key] };
    });

    let form = (
      <form>
        {formEls.map((formElement) => (
          <Input
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
