export type InputConfig = {
  type?: string;
  placeholder?: string;
  options?: { value: any; displayValue: string|number; }[];
};

export type FormElement = {
  elementType: string;
  elementConfig?: InputConfig;
  value: string | number;
  validation?: {
    [Validations: string]: boolean | number;
  };
  isValid: boolean;
  touched?: boolean;
};

export type ContactDataState = {
  loading: boolean;
  formIsValid: boolean;
  orderForm?: {
    [ElementNames: string]: FormElement;
  };
};

export enum Validations {
  isRequired = 'isRequired',
  minLength = 'minLength',
  maxLength = 'maxLength',
}

export enum ElementNames { 
  name = 'name',
  email = 'email',
  street = 'street',
  postCode = 'postCode',
  country = 'country',
  deliveryMethod = 'deliveryMethod',
};

