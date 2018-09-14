import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class DataStorageService {
  url = 'https://code-udemy.firebaseio.com/angular6.json';

  constructor(private http: Http,
    private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(this.url)
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
