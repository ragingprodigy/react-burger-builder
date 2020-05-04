import { TEventHandler } from '../callbacks';

export interface IBuildControlProps {
  label: string;
  added: TEventHandler;
  removed: TEventHandler;
  disabled: boolean;
}
