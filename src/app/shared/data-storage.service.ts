import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn : 'root'
})
export class DataStorageService {
  // name : string | null = null;
  // car : {color : string | null} = {color: null};

  constructor(private http : HttpClient, private recipeService : RecipeService, private authService : AuthService) {}

  storeRecipies() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://ng-course-recipe-book-5cb66-default-rtdb.firebaseio.com/recipes.json', recipes).
    subscribe(response => {
      console.log(response);
    })
  }

  fetchRecipies() {
    // console.log("Testing Name", this.name ?? "Mg Mg");
    // console.log("Testing car", this.car?.color);

    // return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>('https://ng-course-recipe-book-5cb66-default-rtdb.firebaseio.com/recipes.json'
      // {
      //   params : new HttpParams().set('auth', user?.token ?? "")
      // }
      ).pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients : recipe.ingredients ? recipe.ingredients : []
            }
          })
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes)
        }));
  }
}
