import { TBurgerBuilderState } from './burderBuilder/burderBuilder';
import { TOrderState } from './order/order';

export type TAppState = {
  burderBuilder: TBurgerBuilderState;
  order: TOrderState;
};
