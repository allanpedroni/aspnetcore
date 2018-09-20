import { AuthGuardService } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent},
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
    { path: ':id', component: RecipeDetailComponent},
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService]},
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
