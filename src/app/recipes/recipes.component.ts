import { Component, OnInit } from '@angular/core';
import { IRecpie } from './IRecpie';
import { RecpieService } from './recpie.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  selectedRecepie:IRecpie;
  constructor(private recpieService:RecpieService) { }

  ngOnInit(): void {
  }

}
