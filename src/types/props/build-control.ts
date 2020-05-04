import { TEventHandler } from '../../interfaces/callbacks';

export type BuildControlProps = { label: string; added: TEventHandler; removed: TEventHandler; disabled: boolean };
