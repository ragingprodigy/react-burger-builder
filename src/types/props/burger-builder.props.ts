import { BurgerBuilderAction } from '../states/redux/burger-builder.action';
import { RouteComponentProps } from 'react-router-dom';
import { BurgerBuilderState } from '../states/redux/burger-builder.state';

export interface BurgerBuilderProps extends RouteComponentProps {
  ingredients: BurgerBuilderState['ingredients'];
  totalPrice: BurgerBuilderState['totalPrice'];
  onAddIngredient: (name: BurgerBuilderAction['ingredientName']) => void;
  onRemoveIngredient: (name: BurgerBuilderAction['ingredientName']) => void;
}
