export type InputProps = {
  elementType: "input" | "textarea" | string;
  label?: string;
  value?: any;
  elementConfig?: {
    name?: string;
    type?: string;
    placeholder?: string;
  };
};
