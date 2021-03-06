export interface IInputProps {
  elementType: 'input' | 'textarea' | string;
  label?: string;
  value?: any;
  elementConfig?: {
    name?: string;
    type?: string;
    placeholder?: string;
    options?: { value: any; displayValue: any }[];
  };
  changed: (v: any) => void;
  invalid?: boolean;
  touched?: boolean;
}
