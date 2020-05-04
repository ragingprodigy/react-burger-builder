import { TBurgerBuilderState } from './burderBuilder/burderBuilder';
import { TOrderState } from './orders/order';
import { TAuthState } from './auth/auth';

export type TAppState = {
  burgerBuilder: TBurgerBuilderState;
  order: TOrderState;
  auth: TAuthState,
};
