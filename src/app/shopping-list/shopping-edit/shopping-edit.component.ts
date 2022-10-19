import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Integredient } from 'src/app/interfaces/integredient';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent {
  @ViewChild('f') form:NgForm;
  destroy$ = new Subject();
  editMode:boolean;
  editedIndex:number;
  editedItem:Integredient;
  constructor(private slistService: ShoppingListService) {
    this.slistService.editIngredients.asObservable()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(index => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.slistService.getIngredientsWithIndex(index)        
        this.form.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      })
  }

  add(form: NgForm) {
    if(!this.editMode) this.slistService.addIngredient({ name: form.value.name, amount: form.value.amount })
    else this.slistService.update(this.editedIndex,this.form.value)
    this.clear()
  }

  delete() {
    this.slistService.delete(this.editedIndex) 
    this.clear()
  }

  clear() {
    this.editMode = false;
    this.editedIndex = -1;
    this.form.reset()
  }

  ngOnDestroy() {
    this.destroy$.next(null)
  }

}
