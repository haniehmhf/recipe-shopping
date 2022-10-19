import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject,takeUntil } from 'rxjs';
import { IRecpie } from '../IRecpie';
import { RecpieService } from '../recpie.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecpie: IRecpie | null;
  destroy$: Subject<any> = new Subject();
  param: number;
  constructor(
    private recpieService: RecpieService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((param:any) => {  
        this.param = +param.id;              
        this.selectedRecpie = this.recpieService.getRecpie(+this.param)
      })
  }

  addToList() {
    this.recpieService.addToList((this.selectedRecpie as IRecpie).ingredients)
  }

  delete() {
    this.recpieService.deleteRecipe(this.param)
  }

  ngOnDestroy() {
    this.destroy$.next(null)
  }

}
