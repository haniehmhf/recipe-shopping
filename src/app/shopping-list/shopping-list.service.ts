import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Integredient } from "../interfaces/integredient";
import { ShoppingListAction } from "../store/shopping-list/shopping-list.action";
import { getIngredients, getIngredientsWithIndex } from "../store/shopping-list/shopping-list.reducer";
import { CustomStore } from "../store/store";
@Injectable()
export class ShoppingListService {
  editIngredients : Subject<number> = new Subject();  
  integredients: BehaviorSubject<Integredient[]> = new BehaviorSubject([] as Integredient[]);

  constructor(private store:CustomStore) {}

  getIngredientsWithIndex(index:number) {
    return this.store.getState(getIngredientsWithIndex(index))
  }

  addIngredient(item:any,isArray?:boolean) {
    if(!isArray) this.store.dispatch(new ShoppingListAction.AddIngredientAction(item))
    else this.store.dispatch(new ShoppingListAction.AddIngredientsAction(item))
  }

  update(index:number,ingredient:Integredient) {
    this.store.dispatch(new ShoppingListAction.UpdateIngredientsAction({index,ingredient}))
  }

  delete(i:number) {
    this.store.dispatch(new ShoppingListAction.DeleteIngredientsAction(i))
  }
}