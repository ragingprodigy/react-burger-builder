import { GenericHandler } from './callbacks';

export interface IAppProps {
  checkAuthState: GenericHandler;
  isAuthenticated: boolean;
}
