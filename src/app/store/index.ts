import { ActionReducerMap } from '@ngrx/store';
import { ShoppingListReducer, ShoppingListState } from './shopping-list/shopping-list.reducer';

export const rootReducer = {};

export interface AppState {
    shoppingList: ShoppingListState;
};

export const reducers: ActionReducerMap<AppState, any> = {
    shoppingList: ShoppingListReducer
};



