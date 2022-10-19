import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IRecpie } from './IRecpie';
import { RecpieService } from './recpie.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolver implements Resolve<IRecpie[]> {
    constructor(private recipeService:RecpieService){}
    resolve(route: ActivatedRouteSnapshot): Observable<IRecpie[]> | Promise<IRecpie[]> | IRecpie[] {
        const recipes = this.recipeService.recpies
        if(recipes && recipes.length) return of(recipes)       
        return this.recipeService.fetchRecipes();
    }
}