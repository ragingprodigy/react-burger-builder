import { TEventHandler } from '../callbacks';

export interface ISideDrawerProps {
  closed: TEventHandler;
  open: boolean;
  isAuthenticated: boolean;
}
