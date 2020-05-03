export type InputConfig = {
  type?: string;
  placeholder?: string;
  options?: { value: any; displayValue: string | number }[];
};

export type FormElement = {
  elementType: string;
  elementConfig?: InputConfig;
  value: any;
  validation?: {
    [Validations: string]: boolean | number;
  };
  isValid: boolean;
  touched?: boolean;
};

export enum Validations {
  isRequired = "isRequired",
  minLength = "minLength",
  maxLength = "maxLength",
  isNumeric = "isNumeric",
  isEmail ='isEmail',
}
