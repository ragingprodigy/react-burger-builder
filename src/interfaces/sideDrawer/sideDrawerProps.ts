import { GenericHandler } from '../../types/callbacks';

export interface ISideDrawerProps {
  closed: GenericHandler;
  open: boolean;
  isAuthenticated: boolean;
}
