import { TIngredients } from "../ingredients/ingredients";
import { RouteComponentProps } from "react-router-dom";

export interface ICheckoutProps extends RouteComponentProps {
  ingredients: TIngredients;
  purchased: boolean;
}
