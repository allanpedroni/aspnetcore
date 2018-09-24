import { AuthGuardService } from './auth/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipesService } from './recipes/recipes.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [ShoppingListService, RecipesService, DataStorageService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
