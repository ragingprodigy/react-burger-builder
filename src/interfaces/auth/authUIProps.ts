import { TAuthAction } from './authAction';

export interface IAuthUIProps {
  loading: boolean;
  error: any;
  isAuthenticated: boolean;
  buildingBurger: boolean;
  authRedirectPath: string;
  onAuth: (email: string, password: string, isSignUp: boolean) => any;
  onSetAuthRedirectPath: () => TAuthAction;
}
