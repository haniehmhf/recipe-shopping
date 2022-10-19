import { Injectable } from "@angular/core";
import { ActionsSubject, createSelector, createSelectorFactory, defaultMemoize, ReducerManager, Store } from "@ngrx/store";
import { BehaviorSubject } from "rxjs";
import { AppState } from ".";
export abstract class CustomStateObservable extends BehaviorSubject<AppState>{ }
@Injectable({ providedIn: 'root' })
export class CustomStore extends Store<AppState> {
    constructor(
        private state: CustomStateObservable,
        actionsObserver: ActionsSubject,
        reducerManager: ReducerManager) {
        super(state, actionsObserver, reducerManager);
    }

    getState(
        prop?: any,
        ...input: any[]
      ) {        
        if (!prop) return this.state.value
    
        const projectorFn = createSelector(() => this.state.value, prop)
        return createSelectorFactory(defaultMemoize)([projectorFn, ...input])(this);
      }
}