import { EventEmitter, Injectable } from "@angular/core";
import { Subject  } from "rxjs";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // private => can't directly access this array from outside
  // private recipes : Recipe[] = [
  //   new Recipe('A Test Recipe',
  //    'This is simply a test',
  //    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //    [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 20)
  //    ]),
  //   new Recipe('Another Test Recipe',
  //   'This is simply a test',
  //    'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
  //    [
  //     new Ingredient('Buns', 5),
  //     new Ingredient('Meat', 10),
  //    ])

  // ];

  private recipes : Recipe[] = [];

  constructor(private slService : ShoppingListService) {}

  setRecipes(recipes : Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id : number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients : Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe : Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
