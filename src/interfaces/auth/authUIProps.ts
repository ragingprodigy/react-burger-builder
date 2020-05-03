export interface IAuthUIProps {
  loading: boolean;
  error: any;
  onAuth: (email: string, password: string, isSignUp: boolean) => any;
}
