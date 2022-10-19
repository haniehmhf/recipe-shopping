import { Action } from "@ngrx/store";
import { Integredient } from "src/app/interfaces/integredient";

export namespace ShoppingListAction {
    export enum Types {
        AddIngredients = 'ADD_INGREDIENTS',
        AddIngredient = 'ADD_INGREDIENT',
        UpdateIngredients = 'UPDATE_INGREDIENTS',
        DeleteIngredient = 'DELETE_INGREDIENTS'
    }

    export class AddIngredientAction implements Action {
        readonly type = ShoppingListAction.Types.AddIngredient
        constructor(public payload: Integredient) { }
    }
    
    export class AddIngredientsAction implements Action {
        readonly type = ShoppingListAction.Types.AddIngredients
        constructor(public payload: Integredient[]) { }
    }
    
    export class UpdateIngredientsAction implements Action {
        readonly type = ShoppingListAction.Types.UpdateIngredients
        constructor(public payload: {index:number , ingredient:Integredient}) { }
    }
    
    export class DeleteIngredientsAction implements Action {
        readonly type = ShoppingListAction.Types.DeleteIngredient
        constructor(public index: number) { }
    }

    export type Actions = AddIngredientAction|  AddIngredientsAction | UpdateIngredientsAction | DeleteIngredientsAction

}


