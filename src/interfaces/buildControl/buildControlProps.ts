import { GenericHandler } from '../../types/callbacks';

export interface IBuildControlProps {
  label: string;
  added: GenericHandler;
  removed: GenericHandler;
  disabled: boolean;
}