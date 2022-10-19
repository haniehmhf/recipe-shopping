import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, tap } from "rxjs";
import { BASE_URL } from "../app.module";
import { AuthService } from "../auth/auth.service";
import { Integredient } from "../interfaces/integredient";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { IRecpie } from "./IRecpie";
@Injectable({providedIn:'root'})
export class RecpieService {
  recipeChange$ = new Subject();
  recpies: IRecpie[];

  constructor(
    private shoppingService: ShoppingListService,
    private http:HttpClient,
    private router:Router,
    @Inject(BASE_URL) private httpUrl:string
  ) { }

  getList() {    
    return [...this.recpies]
  }

  getRecpie(index: number) {    
    return this.recpies ? this.recpies[index] : null;
  }

  addToList(ingredients: Integredient[]) {
    this.shoppingService.addIngredient(ingredients,true)
  }

  deleteRecipe(id:number) {
    this.recpies = this.recpies.filter((i:IRecpie,index:number) => index != id)
    this.saveRecpies()
    this.router.navigate(['recpies'])
  }

  updateRecipe(data: IRecpie, id?: number) {
    if (id) this.recpies[id] = { ...data }
    else {
      if(!this.recpies) this.recpies = []
      this.recpies.push(data)
    }
    this.saveRecpies()
  }

  saveRecpies() {
    this.http.put<any>(`${this.httpUrl}recipes.json`,this.recpies).subscribe((res:IRecpie[]) => {
      this.recpies = res;
      this.recipeChange$.next('')
    })
  }

  fetchRecipes() {
    return this.http.get<IRecpie[]>(`${this.httpUrl}recipes.json`)
    .pipe(tap(res => {
      this.recpies = res;      
      this.recipeChange$.next('');
    }))
  }
}