export interface IAuthUIProps {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  onAuth: (email: string, password: string, isSignUp: boolean) => any;
}
