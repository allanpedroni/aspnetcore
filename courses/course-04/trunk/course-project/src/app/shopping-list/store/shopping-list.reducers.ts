import { Ingredient } from './../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list-actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
    editedINgredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 2),
    new Ingredient('Tomatoes', 3),
    new Ingredient('Carrots', 5)
  ],
  editedIngredient: null,
  editedINgredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedINgredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedINgredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedINgredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients
      };
    case ShoppingListActions.START_EDIT:
      const editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedINgredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedINgredientIndex: -1
      };
    default:
      return state;
  }
}
