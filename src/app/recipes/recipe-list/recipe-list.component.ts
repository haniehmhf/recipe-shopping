import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith, Subject, takeUntil } from 'rxjs';
import { IRecpie } from '../IRecpie';
import { RecpieService } from '../recpie.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recpies: IRecpie[];
  destroy$ = new Subject();
  searchKey = '';
  loading:boolean = true;
  constructor(
    private recpieService:RecpieService,
    private router:Router,
    private route:ActivatedRoute,
    private cd:ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.recpieService.recipeChange$.asObservable().pipe(startWith(''))
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.recpies = this.recpieService.getList()      
      this.loading = false;
      this.cd.markForCheck()
    })
  }

  addNew() {
    this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy() {
    this.destroy$.next('')
  }
}
