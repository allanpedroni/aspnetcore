import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

export interface FeatureState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    // tslint:disable-next-line:max-line-length
    new Recipe('A test Recipe 1', 'This is simply a teste 1', 'https://us.123rf.com/450wm/alexraths/alexraths1604/alexraths160400131/56097020-beef-steaks-on-the-grill-with-flames.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    // tslint:disable-next-line:max-line-length
    new Recipe('Cheese Burguer', 'This is simply a teste 2', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdS8w7AT6wAyI1eI56JClTsrbwVfzuDx3x3Vf6mwc2w52GfZWX',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 2),
        new Ingredient('Bacon', 10),
        new Ingredient('Cheese', 5),
      ]),
  ]
};

export function recipeReducer(state = initialState, action) {
  return state;
}
