import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Integredient } from '../interfaces/integredient';
import { AppState } from '../store';
import { getIngredients } from '../store/shopping-list/shopping-list.reducer';
import { CustomStore } from '../store/store';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  integredients$: Observable<Integredient[]>;
  destroy$ = new Subject();
  constructor(
    private shoppingListService:ShoppingListService,
    private store:CustomStore
  ) { }

  ngOnInit(): void {
    this.integredients$ = this.store.select(getIngredients)
  }

  edit(index:number) {
    this.shoppingListService.editIngredients.next(index)
  }

  ngOnDestroy() {
    this.destroy$.next(null)
  }
}
