import { createSelector } from "@ngrx/store";
import { Integredient } from "src/app/interfaces/integredient";
import { AppState } from "..";
import { ShoppingListAction } from "./shopping-list.action";
export interface ShoppingListState {
    ingredients: Integredient[];
}
const initalState:ShoppingListState = {
    ingredients: [
        { name: 'Tomato', amount: 10 },
        { name: 'Apple', amount: 3 }
    ]
}

export function ShoppingListReducer(state: ShoppingListState = initalState, action:ShoppingListAction.Actions) {
    switch (action.type) {
        case ShoppingListAction.Types.AddIngredient: {            
            return { ...state , ingredients:[...state.ingredients, action.payload]};
        }
        case ShoppingListAction.Types.AddIngredients: {            
            return { ...state , ingredients:[...state.ingredients, ...action.payload]};
        }
        case ShoppingListAction.Types.UpdateIngredients:{ 
            const updatedIngredient = state.ingredients[action.payload.index];
            const newIngredient = {...updatedIngredient, ...action.payload.ingredient } 
            const updatedIngredients = [...state.ingredients ]
            updatedIngredients[action.payload.index] = newIngredient
            return { ...state, ingredients:[...updatedIngredients]};
        } 
        case ShoppingListAction.Types.DeleteIngredient: {
            const newIng = state.ingredients.filter((_,index:number) => index != action.index);
            return { ...state , ingredients:[ ...newIng ]}
        }
        default: {
            return state
          }
    }
}

export const selectFeature = (state: AppState) => state.shoppingList;
export const getIngredients = createSelector(
    selectFeature,
    (state: ShoppingListState) => state.ingredients
);
export const getIngredientsWithIndex = (index:number) => createSelector(selectFeature, (state: ShoppingListState) => state.ingredients[index]);


