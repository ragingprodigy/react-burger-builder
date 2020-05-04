import { TEventHandler } from './callbacks';

export interface IAppProps {
  checkAuthState: TEventHandler;
  isAuthenticated: boolean;
}
