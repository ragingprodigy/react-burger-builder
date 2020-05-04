import { GenericHandler } from '../callbacks';

export interface ISideDrawerProps {
  closed: GenericHandler;
  open: boolean;
  isAuthenticated: boolean;
}
