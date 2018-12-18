// import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  url = 'https://code-udemy.firebaseio.com/angular6.json';

  constructor(private httpClient: HttpClient,
    private recipeService: RecipesService,
    // private authService: AuthService
    ) { }

  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put(this.url, this.recipeService.getRecipes());
    // return this.httpClient.put(
    //   this.url,
    //   this.recipeService.getRecipes(),
    //   {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //   });
    const req = new HttpRequest('PUT', this.url, this.recipeService.getRecipes(),
      {
        reportProgress: true
      });
      return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();

    return this.httpClient.get<Recipe[]>(this.url)
      .pipe(map(
        (recipes) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
