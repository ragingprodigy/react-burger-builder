import { GenericHandler } from '../callbacks';

export interface IBuildControlProps {
  label: string;
  added: GenericHandler;
  removed: GenericHandler;
  disabled: boolean;
}