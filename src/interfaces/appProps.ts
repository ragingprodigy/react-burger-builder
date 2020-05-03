import { GenericHandler } from '@burger/types/callbacks';

export interface IAppProps {
  checkAuthState: GenericHandler;
  isAuthenticated: boolean;
}