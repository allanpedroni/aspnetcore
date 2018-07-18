import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test Recipe 1', 'This is simply a teste 1', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
    new Recipe('A test Recipe 2', 'This is simply a teste 2', 'https://cdn.pixabay.com/photo/2017/11/06/07/21/clay-2922934_960_720.png')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
