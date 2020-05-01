export type InputConfig = {
  type?: string;
  placeholder?: string;
  options?: { value: any; displayValue: string|number; }[];
};

export type FormElement = {
  elementType: string;
  elementConfig?: InputConfig;
  value: string|number;
};

export type ContactDataState = {
  loading: boolean;
  orderForm?: {
    [ElementNames: string]: FormElement;
  };
};

export enum ElementNames { 
  name = 'name',
  email = 'email',
  street = 'street',
  postCode = 'postCode',
  country = 'country',
  deliveryMethod = 'deliveryMethod',
};

