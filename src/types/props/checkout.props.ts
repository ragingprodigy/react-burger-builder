import { RouteComponentProps } from 'react-router-dom';
import { BurgerBuilderState } from '../states/redux/burger-builder.state';

export interface CheckoutProps extends RouteComponentProps {
  ingredients: BurgerBuilderState['ingredients'];
  totalPrice: BurgerBuilderState['totalPrice'];
}
