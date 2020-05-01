export type ContactDataState = {
  name: string;
  email: string;
  address: {
    street: string;
    postCode: string;
  };
  loading: boolean;
};
