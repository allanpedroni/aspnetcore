import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataStorageService {
  url = 'https://code-udemy.firebaseio.com/angular6.json';

  constructor(private http: Http,
    private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.url, this.recipeService.getRecipes());
  }
}
