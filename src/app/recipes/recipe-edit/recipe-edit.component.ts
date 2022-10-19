import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RecpieService } from '../recpie.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;
  recpieForm: FormGroup;
  destroy$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    private recpieService: RecpieService,
    public sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((param: any) => {
        this.id = param.id;
        this.editMode = !!this.id;
        this.initForm()
      })
  }

  initForm() {    
    let recpie;
    let ingredientsForm = new FormArray([])
    if (this.editMode) {
      recpie = this.recpieService.getRecpie(this.id)      
      if (recpie && recpie.ingredients) {
        recpie.ingredients.forEach(item => {
          const newForm = new FormGroup({
            'name': new FormControl(item.name, Validators.required),
            'amount': new FormControl(item.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }) as never
          ingredientsForm.push(newForm)
        })
      }
    }
    this.recpieForm = new FormGroup({
      'name': new FormControl((recpie ? recpie.name : ''), Validators.required),
      'imagePath': new FormControl(recpie ? recpie.imagePath : '', Validators.required),
      'description': new FormControl(recpie ? recpie.description : '', Validators.required),
      'ingredients': ingredientsForm
    })
  }

  get controls() {
    return (<FormArray>this.recpieForm.get('ingredients')).controls;
  }

  addIngredients() {
    (<FormArray>this.recpieForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  submitForm() {
    this.recpieService.updateRecipe(this.recpieForm.value, this.id)
    this.cancel()
  }

  deleteIngredient(index: number) {
    (<FormArray>this.recpieForm.get('ingredients')).removeAt(index)
  }

  cancel() {
    this.router.navigate(['recpies'])
  }

  ngOnDestroy() {
    this.destroy$.next('')
  }

}
