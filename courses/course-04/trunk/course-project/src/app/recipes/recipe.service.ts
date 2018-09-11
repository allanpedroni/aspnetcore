import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Ingredient } from './../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
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
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
