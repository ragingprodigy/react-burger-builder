import { GenericHandler } from '@burger/types/callbacks';

export interface ISideDrawerProps {
  closed: GenericHandler;
  open: boolean;
  isAuthenticated: boolean;
}
