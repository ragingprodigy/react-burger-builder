import { GenericHandler } from 'App/types/callbacks';

export interface IAppProps {
  checkAuthState: GenericHandler;
  isAuthenticated: boolean;
}