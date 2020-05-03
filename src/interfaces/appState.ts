import { TBurgerBuilderState } from './burderBuilder/burderBuilder';
import { TOrderState } from './order/order';
import { TAuthState } from './auth/auth';

export type TAppState = {
  burderBuilder: TBurgerBuilderState;
  order: TOrderState;
  auth: TAuthState,
};
