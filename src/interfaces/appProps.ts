import { GenericHandler } from '../types/callbacks';

export interface IAppProps {
  checkAuthState: GenericHandler;
  isAuthenticated: boolean;
}
