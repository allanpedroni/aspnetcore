import { RecipesService } from './recipes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService] // ALL CHILDREN WILL SHARE THE SAME INSTANCE
})
export class RecipesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
