import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
  providedIn : 'root'
})
export class DataStorageService {
  constructor(private http : HttpClient, private recipeService : RecipeService) {}

  storeRecipies() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-5cb66-default-rtdb.firebaseio.com/recipes.json', recipes).
    subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipies() {
    this.http.get('https://ng-course-recipe-book-5cb66-default-rtdb.firebaseio.com/recipes.json').
    subscribe(response => {
      console.log(response);
    })
  }
}
