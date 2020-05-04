export type TEventHandler = (event?: any) => void | undefined | null;

export type TAsyncAction<T> = (
  ...args: any
) => (dispatch: TActionDispatcher<T>) => void;

export type TActionDispatcher<T> = (action: T) => void | TAsyncAction<T>;
